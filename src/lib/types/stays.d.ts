/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Listing {
  id: number;
  title: string;
  description: string;
  rating: number;
  ratingTotal: number;
  total: number;
  subtotal: number;
  imgSrc: string;
  availableCount?: number;
  review?: Review[];
  listing_status?: ListingStatus;
  address?: Address;
  coords: any;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Review {
  thumbnail: string;
  name: string;
  date: Date;
  content: string;
  rating: number;
}

export interface Place extends Listing {
  rooms: Room[];
}

/* ROOM TYPES */
export type RoomType = "suite" | "penthouse" | "single" | "double" | "triple";
export type BedType = "twin" | "full" | "queen" | "king";

export interface Room {
  id: number;
  name: string;
  beds: Beds[];
  price: number;
  quantity: number;
  images?: string;
  roomType?: RoomType;
  stock: number;
}

export interface Beds {
  type: BedType;
  count: number;
}

export interface Expierence extends Listing {
  time: string;
}

export interface CreateStayI {
  city: string;
  country: string;
  street: string;
  postal_code: string;
  province: string;
  businessNature: "BUSINESS" | "INDIVIDUAL" | "Select Business Nature";
  individualTaxIdNbr?: string;
  individualNbr?: string;
  businessRegistrationNbr?: string;
  businessTaxIdNbr?: string;
  // isDiscountAvailable?: boolean;
  // discount?: string;
  // transferService: "NOT_INCLUDED" | "INCLUDED" | "EXTRA_COST";
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  files: any;
}

export interface CreatePlace {
  title?: string;
  description?: string;
  listing_status?: "ACTIVE";
  latitude?: 0;
  longitude?: 0;
  businessNature?: string;
  individualNbr?: string;
  individualTaxIdNbr?: string;
  businessRegistrationNbr?: string;
  businessTaxIdNbr?: string;
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country?: string;
  subtitle?: string;
  place_type?: string;
  booking_policy?: "FLEXIBLE";
  images?: [];
}
