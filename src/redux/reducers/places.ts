/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IinitialState,
  MarkedLocation,
  RoomModel,
  Place,
} from "../../types/places";
import { placeInitState } from "../../lib/constants/stays";

const initialState: IinitialState = {
  places: [],
  sellerPlaces: [],
  rooms: [],
  bookedRooms: [],
  bookRoomsIds: [],
  placeReviews: [],
  addPlaceDetails: placeInitState,
  mapMarkedLocation: {
    continent: "",
    country: "",
    district: "",
    state: "",
    city: "",
    address: "",
    postalCode: 0,
    geometry: {
      lat: 0,
      lng: 0,
    },
  },
  activePlaces: [],
};

const placeSlice = createSlice({
  initialState,
  name: "places",
  reducers: {
    storePlaces: (state, { payload }: PayloadAction<Place[]>) => {
      state.places = payload;
    },
    storeSellerPlaces: (state, { payload }: PayloadAction<Place[]>) => {
      state.sellerPlaces = payload;
    },
    storeActivePlaces: (state, { payload }) => {
      state.activePlaces = payload;
    },
    setMapMarkedLocation: (
      state,
      { payload }: PayloadAction<MarkedLocation>
    ) => {
      state.mapMarkedLocation = payload;
    },
    storeNewPlaceDetails: (
      state,
      { payload }: PayloadAction<typeof initialState.addPlaceDetails>
    ) => {
      state.addPlaceDetails = { ...state.addPlaceDetails, ...payload };
    },
    storeBookedRooms: (state, { payload }) => {
      state.bookedRooms = [...state.bookedRooms, payload];
    },
    clearBookedRooms: (state) => {
      state.bookedRooms = [];
    },
    storeBookRoomsIds: (state, { payload }) => {
      const doesExists = state.bookRoomsIds.filter((id) => id === payload);

      if (doesExists.length) return;
      const updatedBookedRoomsIds = [...state.bookRoomsIds, payload];
      state.bookRoomsIds = updatedBookedRoomsIds;
    },
    removeBookRooms: (state, { payload }) => {
      const updatedPlaces = state.bookRoomsIds.filter((id) => id !== payload);
      state.bookRoomsIds = updatedPlaces;
    },
    clearBookRoomsIds: (state) => {
      state.bookRoomsIds = [];
    },
    storePlaceReviews: (state, { payload }) => {
      state.placeReviews = [...state.placeReviews, payload];
    },
    removePlaceReviews: (state, { payload }) => {
      const updatedPlaces = state.placeReviews.filter(
        (id: any) => id !== payload
      );
      state.placeReviews = updatedPlaces;
    },
    addPlaceToStore: (state, { payload }) => {
      const updatedPlaces = [...state.places, payload];
      const updatedSellerPlaces = [...state.sellerPlaces, payload];

      state.places = updatedPlaces;
      state.sellerPlaces = updatedSellerPlaces;
    },
    removeSellerPlacesFromStore: (state, { payload }) => {
      const updatedPlaces = state.sellerPlaces.filter(
        ({ id }) => id !== payload
      );
      state.sellerPlaces = updatedPlaces;
    },
    storeRooms: (state, { payload }: PayloadAction<RoomModel[]>) => {
      state.rooms = payload;
    },
    clearAddPlaceDetails: (state) => {
      state.addPlaceDetails = placeInitState;
    },
    clearPlaces: (state) => {
      state.activePlaces = [];
      state.places = [];
      state.bookRoomsIds = [];
      state.placeReviews = [];
      state.addPlaceDetails = placeInitState;
    },
  },
});

export const {
  storePlaces,
  storeRooms,
  addPlaceToStore,
  storeNewPlaceDetails,
  storeSellerPlaces,
  storeBookRoomsIds,
  removeBookRooms,
  clearBookedRooms,
  storeBookedRooms,
  clearBookRoomsIds,
  clearPlaces,
  storePlaceReviews,
  removePlaceReviews,
  removeSellerPlacesFromStore,
  storeActivePlaces,
  clearAddPlaceDetails,
  setMapMarkedLocation,
} = placeSlice.actions;

export default placeSlice.reducer;
