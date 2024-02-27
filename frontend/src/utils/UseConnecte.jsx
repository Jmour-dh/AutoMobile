import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const login = (token, userId) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
