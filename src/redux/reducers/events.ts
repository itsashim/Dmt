/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventTypes } from "../../lib/types/events";
import { initEventDetailsState } from "../../lib/constants/events";
import { EventModel } from "../../types/event";

interface IinitialState {
  hosted?: EventTypes[];
  events: EventModel[];
  reservations: any[];
  eventsReviews: any[];
  addEventsDetails: EventModel;
  selectedRequestedEvent?: any;
}

const initialState: IinitialState = {
  hosted: [],
  events: [],
  reservations: [],
  eventsReviews: [],
  addEventsDetails: initEventDetailsState,
  selectedRequestedEvent: [],
};

const eventSlice = createSlice({
  initialState,
  name: "events",
  reducers: {
    storeHostedEvents: (state, { payload }) => {
      return {
        ...state,
        hosted: payload,
      };
    },
    storeEventsReservations: (state, { payload }) => {
      return {
        ...state,
        reservations: payload,
      };
    },
    storeEvents: (state, { payload }: PayloadAction<EventModel[]>) => {
      state.events = payload;
    },
    addEventToStore: (state, { payload }) => {
      const updatedPlaces = [...state.events, payload];

      state.events = updatedPlaces;
    },
    removeEventsFromStore: (state, { payload }) => {
      const updatedPlaces = state.events.filter(({ id }) => id !== payload);

      state.events = updatedPlaces;
    },
    storeEventsReviews: (state, { payload }) => {
      state.eventsReviews = [...state.eventsReviews, payload];
    },
    removeEventsReviews: (state, { payload }) => {
      const updatedPlaces = state.eventsReviews.filter(
        (id: any) => id !== payload
      );
      state.eventsReviews = updatedPlaces;
    },
    storeNewEventDetails: (
      state,
      { payload }: PayloadAction<typeof initialState.addEventsDetails>
    ) => {
      state.addEventsDetails = { ...state.addEventsDetails, ...payload };
    },
    selectedRequestedEvent: (state, { payload }) => {
      return {
        ...state,
        selectedRequestedEvent: payload,
      };
    },
    clearEvents: (state) => {
      state.hosted = [];
      state.events = [];
      state.selectedRequestedEvent = [];
      state.addEventsDetails = initEventDetailsState;
    },
  },
});

export const {
  clearEvents,
  storeEvents,
  addEventToStore,
  storeHostedEvents,
  storeEventsReviews,
  removeEventsReviews,
  storeNewEventDetails,
  removeEventsFromStore,
  selectedRequestedEvent,
  storeEventsReservations,
} = eventSlice.actions;

export default eventSlice.reducer;
