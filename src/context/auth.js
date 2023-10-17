import { useEffect } from "react";
import { createContext, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
      const [token, setToken] = useState(localStorage.getItem("token"));
      const [user, setUser] = useState(null);

      const logout = () => {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
            window.location.reload();
      };

      const login = (data) => {
            setToken(data.payload.token);
            setUser(data.payload.user);
            localStorage.setItem("token", JSON.stringify(data.payload.token));
            setTimeout(() => {
                  logout();
            }, data.payload.expiresAt * 1000 - Date.now());
      };

      useEffect(() => {
            if (token) {
                  const isMyTokenExpired = isExpired(token);
                  const user = decodeToken(token);

                  if (isMyTokenExpired) {
                        console.log(user);
                        logout();
                  } else {
                        console.log(user.exp * 1000 - Date.now());
                        setTimeout(() => {
                              logout();
                        }, user.exp * 1000 - Date.now());
                  }
            }
      }, []);
      return (
            <authContext.Provider
                  value={{
                        token,
                        setToken,
                        setUser,
                        user,
                        login,
                        logout,
                  }}
            >
                  {children}
            </authContext.Provider>
      );
};
