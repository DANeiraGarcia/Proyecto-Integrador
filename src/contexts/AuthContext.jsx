import { useMemo, useState } from "react";
import {
  clearSession,
  getStoredSession,
  loginUser,
  registerUser,
  saveSession,
} from "../utils/authStorage";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredSession());

  const login = ({ email, password }) => {
    const result = loginUser({ email, password });

    if (!result.ok) return result;

    setUser(result.user);
    saveSession(result.user);
    return { ok: true };
  };

  const register = ({ fullName, email, password }) => {
    const result = registerUser({ fullName, email, password });

    if (!result.ok) return result;

    setUser(result.user);
    saveSession(result.user);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    clearSession();
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
