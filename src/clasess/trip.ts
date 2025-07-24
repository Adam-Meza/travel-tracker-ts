import dayjs from "dayjs";
import type { DestinationType, TripTypePrimative } from "../scripts/types";

import { PriceEstimate } from "./PriceEstimate";

class Trip extends PriceEstimate {
  id: number;
  userID: number;
  destinationID: number;
  date: string;
  duration: number;
  status: string;
  suggestedActivities: string[];
  travelers: number;
  destination: DestinationType;
  image: string;
  endDate: string;
  totalPrice: number;

  constructor(tripObj: TripTypePrimative, destination: DestinationType) {
    super(tripObj, destination);
    this.id = tripObj.id;
    this.userID = tripObj.userID;
    this.destinationID = tripObj.destinationID;
    this.date = tripObj.date;
    this.duration = tripObj.duration;
    this.status = tripObj.status;
    this.suggestedActivities = tripObj.suggestedActivities;
    this.travelers = tripObj.travelers;
    this.destination = destination;
    this.image = destination.image;
    this.endDate = this.getEndDate();
    this.totalPrice = this.calculatePrice();
  }
}

export default Trip;
