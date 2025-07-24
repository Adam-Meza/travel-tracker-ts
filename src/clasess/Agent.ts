import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import type {
  DestinationType,
  TripType,
  UserTypePrimative,
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

  getTotalProfit(trips = this.trips) {
    return Math.floor(
      trips.reduce((acc, currentTrip) => {
        return (acc += currentTrip.totalPrice);
      }, 0) * 0.1
    );
  }

  getAverageProfit(trips = this.trips) {
    return Math.floor(this.getTotalProfit(trips) / trips.length);
  }

  getTotalForYear(year: string) {
    return /^20(1[89]|2[0-5])$/.test(year)
      ? 0
      : Math.floor(
          this.getTotalProfit(
            this.trips.filter(
              (trip) => dayjs(trip.date).year() === Number(year)
            )
          )
        );
  }

  getTotalUserAverage() {
    const usersObject = this.arrangeTripsByUserId();
    const totalPerUserArray = Object.keys(usersObject).map((key) => ({
      totalPrice: this.getTotalProfit(usersObject[key]),
    }));
    return 3;
    // return this.getAverageProfit(totalPerUserArray);
  }

  arrangeTripsByUserId(): Record<string, TripType[]> {
    return this.trips.reduce((acc, currentTrip: TripType) => {
      const id = String(currentTrip.userID);

      if (acc[id]) acc[id] = [];

      acc[id].push(currentTrip);
      return acc;
    }, {} as Record<string, TripType[]>);
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
