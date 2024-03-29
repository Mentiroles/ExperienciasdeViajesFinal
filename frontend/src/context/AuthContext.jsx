/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services/backend";

const AuthContext = createContext({});

function AuthContextProviderComponent({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  useEffect(() => {
    const getMyUserData = async () => {
      try {
        const data = await getMyUserDataService({ token });
        setUser(data);
      } catch (error) {
        logout();
      }
    };

    if (token) getMyUserData();
  }, [token]);

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
