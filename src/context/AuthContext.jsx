'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/auth';
import { disconnectSocket } from '../api/socket';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = async () => {
    const { data } = await authApi.getMe();
    setUser(data.user);
    setProfile(data.profile);
    return data;
  };

  useEffect(() => {
    const token = localStorage.getItem('silverlink_token');
    if (!token) {
      setLoading(false);
      return;
    }
    refreshMe()
      .catch(() => localStorage.removeItem('silverlink_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    localStorage.setItem('silverlink_token', data.token);
    setUser(data.user);
    await refreshMe();
    return data.user;
  };

  const registerStudent = async (payload) => {
    const { data } = await authApi.registerStudent(payload);
    localStorage.setItem('silverlink_token', data.token);
    setUser(data.user);
    setProfile(data.profile);
    return data.user;
  };

  const registerCompany = async (payload) => {
    const { data } = await authApi.registerCompany(payload);
    localStorage.setItem('silverlink_token', data.token);
    setUser(data.user);
    setProfile(data.company);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('silverlink_token');
    disconnectSocket();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      user, profile, loading, login, registerStudent, registerCompany, logout, refreshMe,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
