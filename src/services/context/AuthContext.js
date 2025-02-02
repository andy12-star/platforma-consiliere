import React, { createContext, useContext, useState } from "react";
import AuthService from "../AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username, password) => {
    const data = await AuthService.login(username, password);
    setUser(data.user);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const register = async (registerValues) => {
    await AuthService.register(registerValues);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
