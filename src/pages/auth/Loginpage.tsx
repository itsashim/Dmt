import { NavLink } from "react-router-dom";
// import { Svg } from "../../assets";
import { LoginForm } from "../../components";

const Loginpage = () => {
  return (
    <div className={`flex justify-between items-start h-full w-full`}>
      <div className={`flex flex-col flex-1 lg:w-1/2 p-8 min-h-screen`}>
        <div className={`flex flex-col flex-1 justify-center items-center`}>
          <h3 className={`text-2xl font-bold text-dark-blue mb-8`}>Log In</h3>
          <LoginForm />
          <div
            className={`flex gap-4 lg:gap-0 flex-col lg:flex-row justify-between items-center`}
          >
            <div className={`flex gap-1 mt-4 justify-between items-center`}>
              <p className={`text-gray fonr-medium text-sm`}>
                Don’t you have an account?
              </p>
              <NavLink
                to={`/auth/signup`}
                className={`text-sm font-semibold text-primary`}
              >
                Create One
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className={`hidden md:flex flex-col gap-20 p-4 justify-center items-center min-h-screen h-full w-1/2`}
      >
        <img
          src={Svg.hotAir}
          className={`h-auto max-w-full`}
          alt={`hot air baloon graphics`}
        />
        <div className={`text-center max-w-[40ch]`}>
          <h2 className={`text-4xl text-dark-purple font-semibold`}>
            Recapture The Magic
          </h2>
          <p className={`text-sm text-dark-gray font-normal mt-2`}>
            Browse and book tours and activities so incredible, you’ll want to
            tell your friends.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Loginpage;
