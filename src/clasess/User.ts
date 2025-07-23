import dayjs from "dayjs";
import type { UserTypePrimative, TripType } from "../types";

class User {
  id: number;
  name: string;
  trips: TripType[];
  travelerType: string;
  totalSpent?: number;

  constructor(travelerObj: UserTypePrimative, trips: TripType[]) {
    this.id = travelerObj.id;
    this.name = travelerObj.name;
    this.totalSpent = 0;
    this.travelerType = travelerObj.travelerType;
    this.trips = this.formatTripData(trips);
  }

  totalSpentOnTrips(trips: TripType[]): number {
    return trips.reduce((acc, trip) => (acc += trip.totalPrice), 0);
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
