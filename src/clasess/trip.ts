import dayjs from "dayjs";
import type { DestinationType, TripType, TripTypePrimative } from "../types";

class Trip implements TripType {
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

  calculatePrice() {
    const totalLogdging =
      this.duration * this.destination.estimatedLodgingCostPerDay;

    const flightCost =
      this.destination.estimatedFlightCostPerPerson * this.travelers;

    const total = (totalLogdging + flightCost) * 1.1;
    return Number(total.toFixed(2));
  }

  getEndDate() {
    return dayjs(this.date).add(this.duration, "days").format("MM/DD/YYYY");
  }
}

export default Trip;
