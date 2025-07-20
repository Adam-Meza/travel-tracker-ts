import type { UserType, TripType } from "../types";

class User {
  id: number;
  name: string;
  trips: TripType[];
  travelerType?: string;

  constructor(travelerObj: UserType, trips: TripType[]) {
    (this.id = travelerObj.id),
      (this.name = travelerObj.name),
      (this.travelerType = travelerObj.travelerType);
    this.trips = trips;
  }

  // totalSpentOnTrips() {
  //   return !this.trips
  //     ? "Trips Data is undefined"
  //     : this.trips.reduce((acc, currentTrip) => {
  //         return currentTrip (acc += currentTrip.totalPrice);
  //       }, 0);
  // }
}

export default User;
