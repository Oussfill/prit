import { useState } from 'react';
import api from '@/lib/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (phone: string, password: string) => {
    const response = await api.post('user/login', { phone, password });
    if (response.token) {
      setToken(response.token);
      setUser(response.user);
    }
    return response;
  };

  const register = async (name: string, phone: string, password: string) => {
    const response = await api.post('user/register', { name, phone, password });
    if (response.token) {
      setToken(response.token);
      setUser(response.user);
    }
    return response;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return { user, token, login, register, logout };
};