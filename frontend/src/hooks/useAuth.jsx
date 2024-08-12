import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
