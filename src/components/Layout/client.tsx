import { Outlet, useLocation } from "react-router-dom";
import { ClientNavbar, Footer } from "..";
// import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
// import { RootAppState } from "../../redux/store";
// import { useEffect } from "react";
// import { getPlaces, getActivePlaces } from "../../redux/actions/places";
// import { getAllEvents, getEventReservations } from "../../redux/actions/events";

const ClientLayout = () => {
  // const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  // const { user } = useAppSelector((state: RootAppState) => state.auth);

  // useEffect(() => {
  //   dispatch(getPlaces());
  //   dispatch(getActivePlaces());

  //   dispatch(getAllEvents());
  //   dispatch(getEventReservations());
  // }, []);

  // if (user.role !== "BUYER") {
  //   return <Navigate to="/app/dashboard" replace />;
  // }

  return (
    <div className={`w-full h-full`}>
      <div className={`block relative -z-10 h-20 w-full`} />
      <ClientNavbar />
      <Outlet />
      {pathname !== "/search" && <Footer />}
    </div>
  );
};

export default ClientLayout;
