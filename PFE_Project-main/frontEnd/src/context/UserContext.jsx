import { createContext, useState } from "react";

const UserContext = createContext(null); // ✅ إنشاء `UserContext`

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ✅ تخزين بيانات المستخدم

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; // ✅ تصدير `UserContext` بشكل صحيح
