/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import api from "../../api";
import { message } from "antd";
import { setUser } from "../reducers/auth";

const user_id = localStorage.getItem("user_id");

export const AllUsers = () => async () => {
  try {
    const { data } = await api.get(`/users`);

    console.log(data);
  } catch (err: any) {
    message.error(
      err.response.data?.message || "Something went wrong while getting user"
    );
  }
};

export const getUser = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    const {
      data: { data: user },
    } = await api.get(`/users/${userId}`);

    dispatch(setUser(user));
  } catch (err: any) {
    message.error(
      err.response.data?.message || "Something went wrong while getting user"
    );
  }
};

export const updateUser = (body: any) => async (dispatch: AppDispatch) => {
  try {
    const { firstName, lastName, phoneNumber, selectedCountry } = body;

    const res: any = await api.patch(`/users/${user_id}`, {
      firstName,
      lastName,
      phoneNumber,
    });

    const {
      data: { data: user },
    } = res;

    dispatch(setUser(user));
    await dispatch(
      sendWhatsAppCode({
        country: selectedCountry,
      })
    );

    message.success("Successfully updated profile!");
    return user;
  } catch (err: any) {
    message.error(err.response.data?.message || "Update User Failed!");
  }
};

export const updateUserRole = () => async (dispatch: AppDispatch) => {
  try {
    await dispatch(getUser(Number(user_id)));
    const {
      data: {
        data: { user },
      },
    }: any = await api.get(`/users/switch/${user_id}`);

    dispatch(setUser(user));
    return user;
  } catch (err: any) {
    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};

export const updateUserCountry =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());
      const res: any = await api.post("/users/send-whatsapp-code", body);

      message.success(res.data || "Successfully updated profile!");

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message || "Login Failed!");
    }
  };

export const sendWhatsAppCode =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());
      const res: any = await api.post("/users/send-whatsapp-code", body);

      message.success(res.data || "Successfully updated profile!");

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());

      message.error(
        err.response.data?.message ===
          "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
          ? `Switch to SELLER`
          : err.response.data?.error
      );
    }
  };

export const updateUserTransactions =
  (body: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      await api.post("/user", body);
    } catch (err: any) {
      message.error(err.response.data?.message || "Login Failed!");
    }
  };

export const deleteUser = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const { data } = await api.delete(`/users/${userId}`);
    console.log(data);

    dispatch(switchLoading());
  } catch (err: any) {
    dispatch(switchLoading());
    message.error(err.response.data?.message);
  }
};
