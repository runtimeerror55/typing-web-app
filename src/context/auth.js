import { createContext, useState } from "react";

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
      const [token, setToken] = useState(localStorage.getItem("token"));
      const [user, setUser] = useState(null);

      const logout = () => {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
      };

      const login = (data) => {
            setToken(data.payload.token);
            setUser(data.payload.user);
            localStorage.setItem("token", JSON.stringify(data.payload.token));
            setTimeout(() => {
                  logout();
            }, data.payload.expiresAt * 1000 - Date.now());
      };
      console.log(token, user);
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
