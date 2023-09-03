import { createContext, useState } from "react";
export const authContext = createContext(null);
export const AuthProvider = ({ children }) => {
      const [token, setToken] = useState(localStorage.getItem("token"));
      const [user, setUser] = useState(null);
      console.log(token, user);
      return (
            <authContext.Provider value={{ token, setToken, setUser, user }}>
                  {children}
            </authContext.Provider>
      );
};
