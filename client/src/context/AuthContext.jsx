import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // const login = (userData, token) => {
  //   localStorage.setItem("user", JSON.stringify(userData));
  //   localStorage.setItem("token", token);
  //   setUser(userData);
  // };
  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    setUser(data.user);
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
