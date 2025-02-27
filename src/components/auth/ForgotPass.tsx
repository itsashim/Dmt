import { FormikProvider, useFormik } from "formik";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { resetPasswordRequest } from "../../redux/actions/auth";
import { Logo } from "../../assets";
import { Button, DashboardInput } from "..";

const ForgotPass = () => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      const { email } = values;
      dispatch(resetPasswordRequest(email));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md p-5 md:px-10 bg-white rounded shadow-md">
        <img src={Logo.logo_purple} className="w-40 mb-6" alt="dmt_logo" />
        <h1 className="font-semibold text-center text-3xl mb-6">
          Forgot Password
        </h1>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <DashboardInput title="Email" name="email" />
            <Button
              title="Send Request"
              className="text-white w-full font-semibold my-4"
            />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default ForgotPass;
