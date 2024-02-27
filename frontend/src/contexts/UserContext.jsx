import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { hostname } from "../hostname/hostname";

const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const getUsers = async () => {
      if (token) {
        try {
          setLoading(true);
          const response = await fetch(`${hostname}/users`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUsers(data);
          }
        } catch (error) {
          console.error("Erreur lors de la requête:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getUsers();
  }, [token]);

  const value = useMemo(() => ({ users, setUsers, loading }), [users, loading]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};