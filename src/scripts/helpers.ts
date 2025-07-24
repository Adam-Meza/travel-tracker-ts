import type {
  DestinationType,
  TripType,
  TripTypePrimative,
  UserType,
} from "./types.ts";
import Trip from "../clasess/Trip.ts";
import { destinations } from "../../test/test-data/destination-test-data.ts";
import {
  numTravelersInput,
  destinationInput,
  newTripInputs,
} from "./queries.ts";

export const findUsersTrips = (
  data: TripTypePrimative[],
  userID: number
): TripType[] => {
  //@ts-ignore
  return data
    .filter((trip: TripTypePrimative) => trip.userID === userID)
    .map((trip) => {
      const destination = destinations.find(
        (dest: DestinationType) => dest.id === trip.destinationID
      );

      return new Trip(trip, destination as DestinationType);
    });
};

export const findDestination = (
  location: string
): DestinationType | undefined => {
  return destinations.find(
    (dest: DestinationType) => dest.location === location
  );
};

export const checkIfInputsAreValid = (startDate: string, endDate: string) => {
  const dateRegEx =
    /^(20[0-3][0-9]|2040)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const numRegEx = /^([1-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|36[0-5])$/;

  return newTripInputs.every((input) => input.value) &&
    destinations.find(
      (dest: DestinationType) => dest.location === destinationInput.value
    ) &&
    dateRegEx.test(`${startDate}`) &&
    dateRegEx.test(`${endDate}`) &&
    numRegEx.test(`${numTravelersInput.value}`)
    ? true
    : false;
};

export const getTripDetails = (currentUser: UserType): TripType | undefined => {
  if (event?.target instanceof Element) {
    const targetId = Number(event.target.id);

    return currentUser.trips?.find((trip: TripType) => trip.id === targetId);
  }
};

export const resetData = (dataWanted: "trip" | "account") => {
  let resetData;
  switch (dataWanted) {
    case "account": {
      resetData = [
        "",
        "Traveler type:",
        "Total spent on trips: $",
        "Total Amount of Trips Taken:",
      ];
      break;
    }
    case "trip": {
      resetData = [
        "",
        "",
        "",
        "Status: ",
        "Number of Travelers: ",
        "Total Price: $ ",
      ];
      break;
    }
  }
  return resetData;
};
