export interface PaymentServicePayoutBody {
  toPaypalReceiverId: string;
  amount: number;
  note: string;
  subject: string;
  message: string;
}

export interface PaymentOrderEventBody {
  eventId: string;
}

export interface PaymentOrderBoostingEventBody {
  eventId: string;
}

export interface PaymentOrderPlaceBody {
  placeId: number;
  longOfStay: number;
}
