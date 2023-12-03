import { useMemo } from "react";
import { createContext, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
      const [token, setToken] = useState(localStorage.getItem("token"));
      const logout = () => {
            localStorage.removeItem("token");
            setToken(null);
      };
      const decodedToken = useMemo(() => {
            if (token) {
                  const isMyTokenExpired = isExpired(token);
                  const decodedToken = decodeToken(token);
                  console.log(decodedToken);
                  if (isMyTokenExpired) {
                        logout();
                  } else if (
                        !decodedToken._id ||
                        !decodedToken.name ||
                        !decodedToken.email ||
                        !decodedToken.exp
                  ) {
                        logout();
                  } else {
                        setTimeout(() => {
                              logout();
                              window.location = "/";
                        }, decodedToken.exp * 1000 - Date.now());
                        return decodedToken;
                  }
            }
            return null;
      }, [token]);

      const login = (data) => {
            localStorage.setItem("token", JSON.stringify(data.payload.token));
            setToken(data.payload.token);
      };

      return (
            <authContext.Provider
                  value={{
                        decodedToken,
                        login,
                        logout,
                        setToken,
                  }}
            >
                  {children}
            </authContext.Provider>
      );
};
