import { checkIfInputsAreValid, findDestination } from "./helpers";
import dayjs from "dayjs";
import type { UserType } from "./types";
import {
  destinationList,
  inputErrorDisplay,
  startDateInput,
  endDateInput,
  destinationInput,
  numTravelersInput,
} from "./queries";
import Trip from "../clasess/Trip";
import {
  updateDOMAfterInput,
  displayFinanceData,
  closeModals,
} from "./DOMManipulators";
import { PriceEstimate } from "../clasess/PriceEstimate";
import type Agent from "../clasess/Agent";
import { displayRequestCards } from "./cards";
import { displayYearlyProfitChart } from "./chart";

export const postPriceEstimate = () => {
  if (checkIfInputsAreValid(startDateInput.value, endDateInput.value)) {
    const newDestination = findDestination(destinationList.value);
    if (newDestination) {
      let newTripCost = new PriceEstimate(
        {
          id: 0,
          date: startDateInput.value,
          endDate: endDateInput.value,
          travelers: Number(numTravelersInput.value),
        },
        newDestination
      );

      inputErrorDisplay.hidden = false;
      inputErrorDisplay.innerText = `Estimated Cost: $${newTripCost}`;
    }
  }
};

export const handlePostingNewTrip = (currentUser: UserType) => {
  if (checkIfInputsAreValid(startDateInput.value, endDateInput.value)) {
    const newDestination = findDestination(destinationInput.value);

    if (newDestination) {
      const newTrip = new Trip(
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

      currentUser.trips.push(newTrip);
      updateDOMAfterInput(currentUser);
    }
  } else {
    inputErrorDisplay.hidden = false;
    inputErrorDisplay.innerText = "Please fill out all the inputs";
  }
};

export const updateDOMForAgent = (agent: Agent, charts?: boolean) => {
  closeModals();
  displayRequestCards(
    agent.trips.filter((trip) => trip.status === "pending"),
    agent
  );
  displayFinanceData(agent);

  displayYearlyProfitChart(agent);
};
