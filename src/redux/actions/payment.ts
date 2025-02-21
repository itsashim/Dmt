/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchLoading } from "../reducers/ui";
import { AppDispatch } from "../store";
import api from "../../api";
import { message } from "antd";
import {
  PaymentServicePayoutBody,
  PaymentOrderEventBody,
  PaymentOrderBoostingEventBody,
  PaymentOrderPlaceBody,
} from "../../types/payment";

export const getPaymentById =
  (paymentId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.get(`/payment/${paymentId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postPaymentServicePayout =
  (payout: PaymentServicePayoutBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/service/payout`, payout);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postPaymentOrderEvent =
  (order: PaymentOrderEventBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/order/event`, order);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postPaymentOrderBoostingEvent =
  (order: PaymentOrderBoostingEventBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/order/boosting-event`, order);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postPaymentOrderPlace =
  (order: PaymentOrderPlaceBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/order/place`, order);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };

export const postCaptureOrder =
  (orderId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(switchLoading());

      const { data } = await api.post(`/payment/capture-order/${orderId}`);
      console.log(data);

      dispatch(switchLoading());
    } catch (err: any) {
      dispatch(switchLoading());
      console.log(err);
      message.error(err.response.data?.message);
    }
  };
