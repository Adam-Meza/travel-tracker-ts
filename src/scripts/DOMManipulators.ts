import type { TripType, DestinationType, ViewType, UserType } from "./types";
import { destinations } from "../../test/test-data/destination-test-data";
import { displayTripCards } from "./cards";
import {
  inputErrorDisplay,
  allInputs,
  tripDetailsView,
  tripDetailsImg,
  adBackground,
  mainBox,
  homeBtn,
  cardBox,
  destinationList,
  adDestination,
  adPrice,
  modals,
  accountModal,
  logInError,
  overlay,
  accountInfoInputs,
  logInModal,
  tripDetails,
  mainTitle,
  financesBox,
  financesBtn,
  requestBtn,
  requestsBox,
  agentTitle,
  financesDataPoints,
  agentViewContainer,
} from "./queries";
import type Agent from "../clasess/Agent";

export const updateDOMAfterInput = (currentUser: UserType) => {
  displayTripCards(currentUser.trips);
  inputErrorDisplay.hidden = true;
  clearAllInputs();
};

const clearAllInputs = () => {
  allInputs.forEach((input) => (input.value = ""));
};

const hideDOM = () => {
  mainBox.hidden = true;
  adBackground.hidden = true;
  cardBox.hidden = true;
  tripDetailsView.hidden = true;
};

export const handleNavigation = (
  viewToShow: ViewType,
  currentUser?: UserType
) => {
  clearAllInputs();
  hideDOM();

  switch (viewToShow) {
    case "user": {
      mainTitle.innerText = `${currentUser?.name.split(" ")[0]}'s Trips`;
      mainBox.hidden = false;
      adBackground.hidden = false;
      cardBox.hidden = false;
      homeBtn.hidden = false;
      break;
    }
    case "agent": {
      homeBtn.hidden = false;
      mainBox.hidden = false;
      agentViewContainer.hidden = false;
      mainTitle.innerText = "Agent Portal";
      break;
    }
    case "trip details": {
      mainBox.hidden = false;
      tripDetailsView.hidden = false;
      break;
    }
    case "log out": {
      accountModal.hidden = true;
      logInModal.hidden = false;
      break;
    }
  }
};

export const resetDetails = (data: string[], elements: HTMLElement[]) => {
  elements.forEach((elem, index) => {
    elem.innerText = data[index];
  });
};

const populateDestinationList = (destinations: DestinationType[]) => {
  destinations.forEach((destination: DestinationType) => {
    console.log(destination.location);
    destinationList.innerHTML += `<option value='${destination.location}'>`;
  });
  console.log("finsihed");
};

export const displayRandomDestination = () => {
  const n = Math.floor(Math.random() * 50);
  const ranDest = destinations[n];

  adBackground.style.backgroundImage = `url(${ranDest.image})`;
  adDestination.innerText = ranDest.location.split(", ")[0];
  adPrice.innerHTML = `$${ranDest.estimatedLodgingCostPerDay}/<span class="per-night">per night</span>`;
};

const populateAccountModal = (user: UserType) => {
  const accountInfoInputsData = [
    user.name,
    user.travelerType,
    user.totalSpentOnTrips(user?.trips || 0),
    user?.trips.length,
  ];

  accountInfoInputs.forEach((elem, index) => {
    elem.innerText += ` ${accountInfoInputsData[index]}`;
  });
};

export const displayTripDetailsInfo = (trip: TripType) => {
  const tripDetailsData = [
    trip.destination?.location,
    trip.date,
    trip.endDate,
    trip.status,
    trip.travelers,
    trip.totalPrice,
  ];

  tripDetailsImg.style.backgroundImage = `url(${trip.destination?.image})`;
  tripDetails.forEach((elem, index) => {
    elem.innerText += ` ${tripDetailsData[index]}`;
  });
};

export const updateDOMForLogin = (currentUser: UserType) => {
  closeModals();
  handleNavigation("user", currentUser);
  populateAccountModal(currentUser);
  displayTripCards(currentUser.trips);
  populateDestinationList(destinations);
  displayRandomDestination();
};

export const closeModals = () => {
  logInError.hidden = true;
  modals.forEach((modal: HTMLElement) => (modal.hidden = true));
  overlay.classList.remove("active-overlay");
};

export const displayLogInError = () => {
  logInError.hidden = false;
  logInError.innerText = "Enter A Valid User Name and Password";
};

export const handleAgentNav = (header: string) => {
  financesBtn.toggleAttribute("hidden");
  financesBox.toggleAttribute("hidden");
  requestsBox.toggleAttribute("hidden");
  requestBtn.toggleAttribute("hidden");
  agentTitle.innerText = header;
};

export const displayFinanceData = (agent: Agent) => {
  const totalFinanceData = [
    agent.getTotalProfit(),
    agent.getTotalForYear(2023),
    agent.getTotalForYear(2022),
    agent.getAverageProfit(),
    agent.getTotalUserAverage(),
  ];

  financesDataPoints.forEach(
    (span, index) => (span.innerHTML = `${totalFinanceData[index]}`)
  );
};
