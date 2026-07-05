import { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session on first load
  useEffect(() => {
    const storedUser = localStorage.getItem('shopsphere_user');
    const token = localStorage.getItem('shopsphere_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const persistSession = (data) => {
    localStorage.setItem('shopsphere_token', data.token);
    localStorage.setItem('shopsphere_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    persistSession(data);
    toast.success(`Welcome to ShopSphere, ${data.user.name}!`);
    return data;
  }, []);

  const login = useCallback(async (payload) => {
    const data = await authService.login(payload);
    persistSession(data);
    toast.success(`Welcome back, ${data.user.name}!`);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('shopsphere_token');
    localStorage.removeItem('shopsphere_user');
    setUser(null);
    toast.success('You have been logged out');
  }, []);

  const updateUser = useCallback((updatedUser) => {
    localStorage.setItem('shopsphere_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
