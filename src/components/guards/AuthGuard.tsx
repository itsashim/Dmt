import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { RootAppState } from "../../redux/store";
import Loginpage from "../../pages/auth/Loginpage";
import { useAppSelector } from "../../hooks/useTypedSelectors";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(
    (state: RootAppState) => state.auth
  );

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <>
        <Loginpage />
      </>
    );
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);

    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
