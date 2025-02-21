/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MarkedLocation {
  continent: string;
  country: string;
  district: string;
  state: string;
  city: string;
  address: string;
  postalCode: number;
  geometry: {
    lat: number;
    lng: number;
  };
}

export interface CoverImage {
  id: number;
  original_name: string;
  url: string;
  mimetype: string;
  uid: string;
  file_key: string;
  place_id: number;
  eventListingId: string | null;
  createdAt: string;
}

export interface Image {
  id: number;
  original_name: string;
  url: string;
  mimetype: string;
  uid: string;
  file_key: string;
  place_id: number;
  eventListingId: string | null;
  createdAt: string;
}

export interface Count {
  rooms: number;
  reviews: number;
  bookings: number;
  images: number;
  PlaceBuyerHistory: number;
}

export interface Place {
  id: number;
  title: string;
  description: string;
  currency: string | null;
  price: number | null;
  place_type: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  rating: number | null;
  subtitle: string;
  listing_status: string;
  booking_policy: string;
  latitude: number;
  longitude: number;
  businessNature: string;
  individualNbr: string | null;
  individualTaxIdNbr: string | null;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
  user_id: number;
  cover_image_id: number;
  createdAt: string;
  updatedAt: string;
  cover_image: CoverImage;
  images: Image[];
  _count: Count;
}

export interface RoomModel {
  id?: number;
  place_id: number;
  title: string;
  price: number;
  stock: number;
  room_type: string;
  beds: BedModel[];
  isDiscountAvailable: "yes" | "no";
  discount: number;
  transferService: string;
  extraAmount: number;
}

export interface AddPlaceModel {
  id?: string;
  title: string;
  description: string;
  listing_status: "ACTIVE";
  latitude: number;
  longitude: number;
  businessNature: string;
  individualNbr: string;
  individualTaxIdNbr: string;
  businessRegistrationNbr: string;
  businessTaxIdNbr: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  subtitle: string;
  place_type: string;
  booking_policy: "FLEXIBLE";
  images: File[];
}

interface IinitialState {
  places: Place[];
  sellerPlaces: Place[];
  rooms: RoomModel[];
  bookedRooms: any;
  placeReviews: any;
  bookRoomsIds: number[];
  addPlaceDetails: AddPlaceModel;
  mapMarkedLocation: MarkedLocation;
  activePlaces: any[];
}

export interface BedModel {
  bed_type: string;
  amount: number;
}
