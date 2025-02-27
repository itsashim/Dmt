import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootAppState } from "../../redux/store";

const GuestGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootAppState) => state.auth);

  return isAuthenticated ? <Navigate to={"/"} /> : children;
};

export default GuestGuard;
