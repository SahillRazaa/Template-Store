import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await authService.checkAuthStatus();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
        console.error('Not authenticated');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await authService.login({ email, password });
      setUser(data.user);
      navigate('/templates'); 
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    try {
      const { data } = await authService.register({ name, email, password, confirmPassword });
      setUser(data.user);
      navigate('/templates');
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate('/login'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user, 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};