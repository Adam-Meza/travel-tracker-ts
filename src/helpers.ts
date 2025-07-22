import type { DestinationType, TripType, UserType } from "./types";
import Trip from "./clasess/trip";
import { destinations } from "../test/test-data/destination-test-data.ts";
import dayjs from "dayjs";

const startDateInput = document.getElementById(
  "js-start-date"
) as HTMLInputElement;
const endDateInput = document.getElementById("js-end-date") as HTMLInputElement;
const numTravelersInput = document.getElementById(
  "js-num-travelers-input"
) as HTMLInputElement;
const destinationInput = document.getElementById(
  "js-destination-input"
) as HTMLInputElement;
const newTripInputs = [
  ...document.querySelectorAll("new-trip-input"),
] as HTMLInputElement[];

export const makeNewTrip = (
  currentUser: UserType,
  newDestination: DestinationType
): TripType => {
  console.log("inside NewTripInputs");
  console.log(newDestination);
  let newTrip = new Trip(
    {
      id: Date.now(),
      userID: currentUser.id,
      destinationID: newDestination.id,
      duration: dayjs(endDateInput.value).diff(
        dayjs(startDateInput.value),
        "days"
      ),
      travelers: Number(numTravelersInput.value),
      status: "pending",
      suggestedActivities: [],
      date: dayjs(startDateInput.value).format("MM-DD-YYYY"),
    },
    newDestination
  );

  return newTrip;
};

export const findUsersTrips = (data: TripType[], userID?: number) => {
  userID
    ? (data = data.filter((trip: TripType) => trip.userID === userID))
    : null;

  return data.map((trip) => {
    let destination = destinations.find(
      (dest: DestinationType) => dest.id === trip.destinationID
    );

    return new Trip(trip, destination);
  });
};

export const findDestination = (
  location: string
): DestinationType | undefined => {
  return destinations.find(
    (dest: DestinationType) => dest.location === location
  );
};
export const checkIfInputsAreValid = () => {
  const dateRegEx =
    /^(20[0-3][0-9]|2040)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const numRegEx = /^([1-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|36[0-5])$/;

  return newTripInputs.every((input) => input.value) &&
    destinations.find(
      (dest: DestinationType) => dest.location === destinationInput.value
    ) &&
    dateRegEx.test(`${startDateInput.value}`) &&
    dateRegEx.test(`${endDateInput.value}`) &&
    numRegEx.test(`${numTravelersInput.value}`)
    ? true
    : false;
};

export const getTripDetails = (currentUser: UserType): TripType | undefined => {
  return currentUser.trips?.find(
    //@ts-ignore
    (trip: TripType) => trip.id === Number(event?.target?.id)
  );
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
