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
  endDate = this.getEndDate();

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
    (this.id = tripObj.id),
      (this.userID = tripObj.userID),
      (this.destinationID = tripObj.destinationID),
      (this.date = tripObj.date),
      (this.duration = tripObj.duration),
      (this.status = tripObj.status),
      (this.suggestedActivities = tripObj.suggestedActivities);
    this.travelers = tripObj.travelers;
    this.destination = destination;
    this.image = this.destination.image;
    this.endDate = this.getEndDate();
  }

  calculatePrice() {
    let totalLogdging =
      this.duration * this.destination.estimatedLodgingCostPerDay;
    let flightCost =
      this.destination.estimatedFlightCostPerPerson * this.travelers;
    let total = (totalLogdging + flightCost) * 1.1;
    return total;
  }

  getEndDate() {
    return dayjs(this.date).add(this.duration, "days").format("MM/DD/YYYY");
  }
}

export default Trip;
