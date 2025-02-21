/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "../store";
// import {
//   getUsers,
//   loginSuccess,
//   resetUsers,
//   setChatUser,
//   signOut,
//   userLoaded,
// } from "../reducers/auth";
import { switchLoading } from "../reducers/ui";
// import { getAllTransactions } from "./transactions";
// import { resetTransactoins } from "../reducers/transactions";
// import { showAllConversations, showConversations } from "./message";
import { loginSuccess, signOut } from "../reducers/auth";
import { getUser } from "./user";
import { message } from "antd";
import api from "../../api";

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const body = { email, password };
    try {
      dispatch(switchLoading());
      const res = await api.post("/auth/sign-in", body);

      if (!res || !res.data) throw new Error("Invalid response from server");

      const { token, user } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id);

      dispatch(loginSuccess({ user, isAuthenticated: true, token }));
      await dispatch(getUser(+user.id));
    } catch (err: any) {
      console.error("Login Error:", err); // Logs error details
      message.error(
        err?.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      dispatch(switchLoading());
    }
  };

// // export const renewToken = () => async (dispatch: AppDispatch) => {
// //   try {
// //     const res: any = await api.get('/auth/renewtoken');
// //     const user: any = jwtDecode(res.data.token);

// //     dispatch({
// //       type: 'LOGIN_SUCCESS',
// //       payload: { ...res.data, ...user },
// //     });
// //     dispatch(getUser());
// //   } catch (err) {
// //     dispatch({ type: 'AUTH_ERROR' });
// //   }
// // };

// export const getUser = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(switchLoading());
//     const res: AxiosResponse<any, any> = await api.get("/user/");

//     dispatch(userLoaded(res.data));
//     await dispatch(getAllTransactions());
//     await dispatch(showConversations());
//     const { role } = store.getState().auth.user;

//     if (role === "admin") {
//       await dispatch(getAllUser());
//       await dispatch(showAllConversations());
//     }

//     dispatch(switchLoading());
//   } catch (err: any) {
//     dispatch(switchLoading());

//     message.error(
//       err.response.data?.message ||
//         "Failed To load user. Kindly logout and login"
//     );
//   }
// };

export const getAllUser = () => async () => {
  try {
    await api.get("/user/get-all-users");

    // const {
    //   data: { user },
    // } = res.data;

    // dispatch(getUser(user.id));
  } catch (err: any) {
    message.error(
      err.response.data?.message ||
        "Failed To load All user. Kindly logout and login"
    );
  }
};

export const signup = (body: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());
    await api.post("/auth/sign-up-email", body);

    message.success(
      "Registration successfull! Please check your email for confirmation."
    );

    dispatch(switchLoading());
  } catch (err: any) {
    dispatch(switchLoading());
    message.error(err.response.data.error);
  }
};

export const signinwithGoogle =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      await api.post("/auth/sign-in-google", body);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());

      message.error(err.response.data?.message);
    }
  };

export const resendEmailVerification =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      await api.post("/auth/email-confirmation", {
        email,
      });

      dispatch(switchLoading());

      message.success("Email send successfull!");
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.error);
    }
  };

// export const updatePass = (pass: string) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch({
//       type: "BLOCK_MAIN",
//       payload: {
//         blockFlag: true,
//         blockMessage: "Updating",
//       },
//     });
//     await api.post("/auth/updatePassword", pass);

//     dispatch({
//       type: "UNBLOCK_MAIN",
//     });
//     dispatch({
//       type: "SHOW_SNACKBAR",
//       payload: {
//         messageType: "success",
//         feedback: "Successfully Updated Password",
//         openSnackbar: true,
//       },
//     });
//   } catch (err) {
//     dispatch({
//       type: "UNBLOCK_MAIN",
//     });
//     dispatch({
//       type: "SHOW_SNACKBAR",
//       payload: {
//         messageType: "error",
//         feedback: "Wrong Current Password",
//         openSnackbar: true,
//       },
//     });
//   }
// };

export const resetPasswordRequest =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());
      await api.post("/auth/forgotpassword", body);
      dispatch(switchLoading());

      message.success(
        "Successfully Sent Reset password request to your email!"
      );
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err?.response?.data?.errors?.msg);
    }
  };

// export const resetPassword =
//   (body: any, token: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(switchLoading());

//       await api.post(`/auth/resetpassword/${token}`, body);

//       dispatch(switchLoading());
//       message.success("Successfully Changed Password!");
//     } catch (err: any) {
//       dispatch(switchLoading());

//       message.error(err?.response?.data?.errors?.msg);
//     }
//   };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await api.post("/auth/logout");
    dispatch(signOut());
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    message.success("Successfully Logged out!");
  } catch (err: any) {
    message.error(err?.response?.data?.error);
  }
};
