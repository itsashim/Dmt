/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AppDispatch } from "../store";
import {
  addEventToStore,
  storeEvents,
  selectedRequestedEvent,
  storeEventsReservations,
} from "../reducers/events";
import { message } from "antd";
import api, { multipartHeader } from "../../api";
import { storePageDetails, switchLoading } from "../reducers/ui";

export const createEvent = (body: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(switchLoading());

    console.log("Request Payload:", body); // Log the request payload

    const {
      data: { success, data },
    } = await api.post("/events", body, {
      headers: multipartHeader,
    });

    console.log("Response Data:", data); // Log the response data

    dispatch(switchLoading());

    dispatch(addEventToStore(data));
    message.success("Successfully created Event!");

    return success;
  } catch (err: any) {
    dispatch(switchLoading());
    console.error("Error:", err); // Log the error
    message.error(err.response.data?.message);
  }
};

export const getEventsById =
  (eventId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const {
        data: { data },
      } = await api.get(`/events/${eventId}`);

      dispatch(storePageDetails(data));
      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      message.error(err.response.data?.message);
    }
  };

export const getAllEvents = () => async (dispatch: AppDispatch) => {
  try {

    const response = await api.get("/events");

    console.log("Full API Response:", response);
    console.log("Data Received:", response.data);

    dispatch(storeEvents(response.data.data));
  } catch (err: any) {
    console.error("API Call Error:", err);
    console.error("Error Response Data:", err.response?.data);
    console.error("Error Message:", err.message);
    message.error(err.response?.data?.message || "Failed to fetch events");
  }
};

export const getAllHostedEvents = () => async () => {
  try {
    const { data } = await api.get("/events/hosted");

    // dispatch(storeHostedEvents(data));

    return data;
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const getEventReservations = () => async (dispatch: AppDispatch) => {
  try {
    const {
      data: { data },
    } = await api.get("/events/reservations");

    dispatch(storeEventsReservations(data));
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const getEventRequestById = (requestId: number) => async () => {
  try {
    const { data } = await api.get(`/events/request/${requestId}`);
    console.log(data);
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const deleteEvent = (eventId: string) => async () => {
  try {
    await api.delete(`/events/${eventId}`);

    message.success("Successfully deleted a Event!");
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const requestAEvent = (eventListingId: string) => async () => {
  try {
    await api.post(`/events/request`, { eventListingId });

    message.success("Successfully requested a Event!");
  } catch (err: any) {
    message.error(err.response.data?.message);
  }
};

export const getrequestedEvent =
  (eventListingId: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.get(`/events/request/${eventListingId}`);
      dispatch(selectedRequestedEvent(data));
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };

export const approveRequestedEvent =
  (eventListingId: string, eventRequestId: string, status: string) =>
  async () => {
    try {
      await api.put(`/events/request/approve`, {
        eventListingId,
        eventRequestId,
        status,
      });

      message.success("Successfully approved the request!");
    } catch (err: any) {
      message.error(err.response.data?.message);
    }
  };
