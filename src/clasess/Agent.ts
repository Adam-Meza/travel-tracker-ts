import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import type {
  DestinationType,
  TripType,
  UserTypePrimative,
  PriceEstimateType,
} from "../scripts/types";
dayjs.extend(isBetween);

export class Agent {
  name: string;
  users: UserTypePrimative[];
  trips: TripType[];
  destinationsData: DestinationType[];

  constructor(
    users: UserTypePrimative[],
    trips: TripType[],
    destinationsData: DestinationType[]
  ) {
    this.name = "Adam Meza";
    this.users = users;
    this.trips = trips;
    this.destinationsData = destinationsData;
  }

  getTotalProfit(trips = this.trips as { totalPrice: number }[]) {
    return Math.floor(
      trips.reduce((acc, currentTrip) => {
        return (acc += currentTrip.totalPrice);
      }, 0) * 0.1
    );
  }

  getAverageProfit(trips = this.trips as { totalPrice: number }[]) {
    return Math.floor(this.getTotalProfit(trips) / trips.length);
  }

  getTotalForYear(year: number) {
    if (year >= 2001 && year <= 2030) {
      return Math.floor(
        this.getTotalProfit(
          this.trips.filter((trip) => dayjs(trip.date).year() === year)
        )
      );
    }
  }

  getTotalUserAverage() {
    const usersObject = this.arrangeTripsByUserId();

    const totalPerUserArray = Object.keys(usersObject).map((key) => ({
      totalPrice: this.getTotalProfit(usersObject[Number(key)]),
    }));
    return this.getAverageProfit(totalPerUserArray);
  }

  arrangeTripsByUserId(): Record<number, TripType[]> {
    return this.trips.reduce((acc, currentTrip: TripType) => {
      const id = currentTrip.userID;

      if (!acc[id]) acc[id] = [];

      acc[id].push(currentTrip);
      return acc;
    }, {} as Record<number, TripType[]>);
  }

  getUsersCurrentlyTraveling() {
    // return this.trips
    //   .filter((trip) =>
    //     dayjs().isBetween(
    //       dayjs(trip.date),
    //       dayjs(trip.endDate),
    //       null,
    //       "[inclusive]",
    //       "day"
    //     )
    //   )
    //   .reduce((acc, currentTrip) => {
    //     const userName =
    //       this.users.find((user) => currentTrip.userID === user.id)?.name || "";
    //     !acc.find((user) => user.name === userName) ? acc.push(userName) : null;
    //     return acc;
    //   }, [])
    //   .join(", ");
  }
}

export default Agent;
