import dayjs from "dayjs";
import type { UserType, TripType } from "../types";

class User implements UserType {
  id: number;
  name: string;
  trips: TripType[];
  travelerType?: string;

  constructor(travelerObj: UserType, trips: TripType[]) {
    this.id = travelerObj.id;
    this.name = travelerObj.name;
    this.travelerType = travelerObj.travelerType;
    this.trips = this.formatTripData(trips);
  }

  totalSpentOnTrips(): number {
    return this.trips?.reduce((acc, trip) => acc + trip.totalPrice, 0) ?? 0;
  }

  formatTripData(trips: TripType[]) {
    const temp = trips;

    temp.forEach(
      (trip: TripType) => (trip.date = dayjs(trip.date).format("MM-DD-YYYY"))
    );

    return temp;
  }
}

export default User;
