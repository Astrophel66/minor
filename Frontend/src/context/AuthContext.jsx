import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.token) {
        try {
          const decoded = JSON.parse(atob(parsed.token.split('.')[1])); // Decode JWT payload
          const now = Date.now() / 1000;
          if (decoded.exp && decoded.exp < now) {
            localStorage.removeItem('user');
            setUser(null);
          } else {
            setUser(parsed);
          }
        } catch (err) {
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    }
    setAuthLoading(false);
  }, []);

  const login = (data) => {
    const userData = {
      id: data.id,
      username: data.username,
      token: data.token,
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!(user && user.token),
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
