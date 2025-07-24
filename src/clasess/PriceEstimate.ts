import dayjs from "dayjs";
import type {
  DestinationType,
  PriceEstimateType,
  TripTypePrimative,
} from "../types";
dayjs;

export class PriceEstimate {
  id: number;
  duration: number;
  date?: string;
  travelers: number;
  destination: DestinationType;
  endDate: string;
  totalPrice: number;

  constructor(
    tripObj: PriceEstimateType | TripTypePrimative,
    destination: DestinationType
  ) {
    this.id = tripObj.id;
    this.destination = destination;
    this.date = tripObj.date;
    this.endDate = this.getEndDate();
    this.totalPrice = this.calculatePrice();
    this.duration = this.travelers = tripObj.travelers;
  }

  calculatePrice() {
    const totalLogdging =
      this.duration || 0 * this.destination.estimatedLodgingCostPerDay;

    const flightCost =
      this.destination.estimatedFlightCostPerPerson * this.travelers;

    const total = (totalLogdging + flightCost) * 1.1;
    return Number(total.toFixed(2));
  }

  getDuration() {
    return dayjs(this.endDate).diff(dayjs(this.date, "days"));
  }

  getEndDate() {
    const duration = this.duration || this.getDuration();

    return dayjs(this.date).add(duration, "days").format("MM/DD/YYYY");
  }
}
