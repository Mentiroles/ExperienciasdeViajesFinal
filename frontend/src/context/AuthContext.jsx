/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services/backend";

const AuthContext = createContext({});

function AuthContextProviderComponent({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
console.log(token)
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
console.log("token", token)
  useEffect(() => {
    const getMyUserData = async () => {
      console.log("se ejecuta")
      try {
        const data = await getMyUserDataService({ token });
        setUser(data);
        console.log(data);
      } catch (error) {
        logout();
      }
    };

    if (token) getMyUserData();
  }, []);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProviderComponent };
