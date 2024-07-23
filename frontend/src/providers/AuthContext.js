//src/providers/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getUserDetails } from '../api/Auth'; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Optional loading state

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails(token); // Implement this function to fetch user details
        setUser(userDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
        // Handle error (e.g., redirect to login page, show error message)
      }
    };

    if (token) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);

    try {
      const userDetails = await getUserDetails(token);
      setUser(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle error (e.g., redirect to login page, show error message)
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
