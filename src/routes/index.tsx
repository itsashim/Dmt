/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import GuestGuard from "../components/guards/GuestGuard";
// import AuthGuard from "../components/guards/AuthGuard";
import ForgotPass from "../components/auth/ForgotPass";
import { ClientLayout, DashboardLayout, Loader } from "../components";
import {
  DashboardPage as Dashboard,
  ProfilePage as Profile,
  StaysPage as Stays,
  DetailsPage as Details,
  StaysDetailsPage as StaysDetails,
  TripBoardPage as TripBoard,
  EventsPage as Events,
  EventsDetailsPage as EventsDetails,
  AddEventsPage as AddEvents,
  AddStaysPage as AddStays,
  StaysRoomsPage as StaysRooms,
  StaysAddRoomPage as AddStaysRoom,
  StaysEditRoomPage as EditStaysRoom,
  ConfirmEmailPage as ConfirmEmail,
  ReservationPage as Reservation,
  ReservationDetailsPage as ReservationDetails,
} from "../pages";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<Loader loading={true || ""} />}>
      <Component {...props} />
    </Suspense>
  );
};

// Client
const Homepage = Loadable(lazy(() => import("../pages/client/Homepage")));
const Searchpage = Loadable(lazy(() => import("../pages/client/Searchpage")));
const DetailsPage = Loadable(Details);
const TripBoardPage = Loadable(TripBoard);

// Authentication
const ConfirmEmailPage = Loadable(ConfirmEmail);
const LoginPage = Loadable(lazy(() => import("../pages/auth/Loginpage")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/RegisterPage")));

// Dashboard pages
const DashboardPage = Loadable(Dashboard);
const StaysPage = Loadable(Stays);
const EventsPage = Loadable(Events);
const EventsDetailsPage = Loadable(EventsDetails);
const ProfilePage = Loadable(Profile);
const AddStaysPage = Loadable(AddStays);
const StaysRoomsPage = Loadable(StaysRooms);
const StaysAddRoomPage = Loadable(AddStaysRoom);
const StaysEditRoomPage = Loadable(EditStaysRoom);
const AddEventsPage = Loadable(AddEvents);
const StaysDetailsPage = Loadable(StaysDetails);
const ReservationPage = Loadable(Reservation);
const ReservationDetailsPage = Loadable(ReservationDetails);

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      element: <ClientLayout />,
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: "signup",
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <GuestGuard>
              <ForgotPass />
            </GuestGuard>
          ),
        },
        {
          path: "confirm-email",
          element: (
            <GuestGuard>
              <ConfirmEmailPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "app",
      element: (
        <>
          {/* <AuthGuard> */}
          <DashboardLayout />
          {/* </AuthGuard> */}
        </>
      ),
      children: [
        { path: "dashboard", element: <DashboardPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "events", element: <EventsPage /> },
        { path: "stays", element: <StaysPage /> },
        { path: "events/:id/details", element: <EventsDetailsPage /> },
        { path: "stays/:id/details", element: <StaysDetailsPage /> },
        { path: "stays/:id/rooms", element: <StaysRoomsPage /> },
        { path: "stays/:id/rooms/create", element: <StaysAddRoomPage /> },
        {
          path: "stays/:id/rooms/edit/:editId",
          element: <StaysEditRoomPage />,
        },
        { path: "events/create", element: <AddEventsPage /> },
        { path: "stays/create", element: <AddStaysPage /> },
        { path: "reservation", element: <ReservationPage /> },
        {
          path: "reservation/:id/details",
          element: <ReservationDetailsPage />,
        },
      ],
    },
    {
      path: "/",
      element: (
        // <AuthGuard>
        <ClientLayout />
        // </AuthGuard>
      ),
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/trip-board",
          element: <TripBoardPage />,
        },
        {
          path: "/search",
          element: <Searchpage />,
        },
        {
          path: "/:category/details/:id",
          element: <DetailsPage />,
        },
      ],
    },
    { path: "loading", element: <Loader loading={true} /> },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
