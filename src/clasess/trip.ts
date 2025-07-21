import dayjs from "dayjs";
import type { DestinationType, TripType } from "../types";

class Trip {
  id: number;
  userID: number;
  destinationID: number;
  date: string;
  duration: number;
  status: string;
  suggestedActivities?: string[];
  travelers: number;
  destination: DestinationType;
  image: string;
  endDate: string;
  totalPrice: number;

  constructor(
    tripObj: TripType,
    destination = {
      id: 0,
      destination: "", // CHANGE THIS TO LOCATION
      estimatedLodgingCostPerDay: 0,
      estimatedFlightCostPerPerson: 0,
      image: "",
      alt: "",
    }
  ) {
    this.id = tripObj.id;
    this.userID = tripObj.userID;
    this.destinationID = tripObj.destinationID;
    this.date = tripObj.date;
    this.duration = tripObj.duration;
    this.status = tripObj.status;
    this.suggestedActivities = tripObj.suggestedActivities;
    this.travelers = tripObj.travelers;
    this.destination = destination;
    this.image = this.destination.image;
    this.endDate = this.getEndDate();
    this.totalPrice = this.calculatePrice();
  }

  calculatePrice() {
    const totalLogdging =
      this.duration * this.destination.estimatedLodgingCostPerDay;

    const flightCost =
      this.destination.estimatedFlightCostPerPerson * this.travelers;

    const total = (totalLogdging + flightCost) * 1.1;
    return total;
  }

  getEndDate() {
    return dayjs(this.date).add(this.duration, "days").format("MM/DD/YYYY");
  }
}

export default Trip;
