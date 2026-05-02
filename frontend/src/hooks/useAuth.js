import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount and whenever the location changes (handled by caller if needed)
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,
    isLoggedIn: !!user,
    logout,
  };
}
