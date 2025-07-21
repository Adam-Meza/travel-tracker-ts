import dayjs from "dayjs";
import type { UserType, TripType } from "../types";

class User {
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

  totalSpentOnTrips() {
    return !this.trips
      ? "Trips Data is undefined"
      : this.trips.reduce((acc, currentTrip) => {
          //@ts-ignore
          return (acc += currentTrip?.totalPrice);
        }, 0);
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
