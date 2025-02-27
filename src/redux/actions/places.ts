/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppDispatch } from "../store";
import {
  addPlaceToStore,
  storeActivePlaces,
  storeNewPlaceDetails,
  storePlaces,
  storeRooms,
  storeSellerPlaces,
} from "../reducers/places";
import api, { httpHeader, multipartHeader } from "../../api";
import { message } from "antd";
import { storePageDetails, switchLoading } from "../reducers/ui";
import { placeInitState } from "../../lib/constants/stays";

export const getPlaces = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.get("/places");

    console.log(data);

    dispatch(storePlaces(data));
  } catch (err: any) {
    console.log(err.response.data);
    message.error(err.response.data?.message);
  }
};

export const getSellerPlaces =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const {
        data: { data },
      } = await api.get(`places/seller?sellerId=${id}`);

      dispatch(storeSellerPlaces(data));
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };

export const createPlace = (body: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    const {
      data: { data, success },
    } = await api.post("/places", body, {
      headers: multipartHeader,
    });

    dispatch(switchLoading());
    dispatch(addPlaceToStore(data));
    dispatch(storeNewPlaceDetails(placeInitState));
    message.success("Successfully created!");

    return success;
  } catch (err: any) {
    dispatch(switchLoading());
    console.log(err.response.data?.message);

    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};

export const updateStay = (body: any, stayId: string) => async () => {
  try {
    await api.patch(`/places/${stayId}`, body);

    message.success("Successfully updated!");
  } catch (err: any) {
    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};

export const getActivePlaces = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.get(`/places/active`);
    dispatch(storeActivePlaces(data));
  } catch (err: any) {
    console.log(err);
    message.error(err.response.data?.message);
  }
};

export const getPlaceImage = (placeId: string) => async () => {
  try {
    await api.get(`/places/${placeId}/images`);
  } catch (err: any) {
    console.log(err);
    message.error(err.response.data?.message);
  }
};

export const deletePlaceImage =
  (stayId: string, assetId: string) => async () => {
    try {
      await api.delete(`/places/${stayId}/images/${assetId}`);

      message.success("Successfully deleted!");
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };

export const getPlaceById =
  (placeId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());
      const { data } = await api.get(`/places/${placeId}`);

      dispatch(storePageDetails(data));
      dispatch(getPlaceRooms(placeId));

      dispatch(switchLoading());
      return data;
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getPlaceRooms =
  (placeId: number) => async (dispatch: AppDispatch) => {
    try {
      const {
        data: { data },
      } = await api.get(`/rooms/${placeId}`);

      console.log(data);
      dispatch(storeRooms(data));

      return data;
    } catch (err: any) {
      message.error(
        err.response.data?.message ===
          "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
          ? `Switch to SELLER`
          : err.response.data?.message
      );
    }
  };

export const getRoom = (placeId: number, roomId: number) => async () => {
  try {
    const { data } = await api.get(`/rooms/${placeId}/${roomId}`);

    console.log(data);
    message.success("Successfully created!");
  } catch (err: any) {
    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};

export const createRoom = (body: any) => async () => {
  try {
    const {
      data: { success },
    } = await api.post("/rooms", body, {
      headers: httpHeader,
    });

    message.success("Room Successfully created!");

    return success;
  } catch (err: any) {
    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};

export const updateRoom = (roomId: number, body: any) => async () => {
  try {
    const {
      data: { success },
    } = await api.patch(`/rooms/${roomId}`, body, {
      headers: httpHeader,
    });

    message.success(`Room Successfully updated`);
    return success;
  } catch (err: any) {
    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};

export const deleteRoom = (roomId: string) => async () => {
  try {
    await api.delete(`/rooms/${roomId}`);

    message.success("Successfully deleted!");
  } catch (err: any) {
    message.error(
      err.response.data?.message ===
        "Forbidden! Provided Role : BUYER. Allowed Roles : SELLER."
        ? `Switch to SELLER`
        : err.response.data?.message
    );
  }
};
