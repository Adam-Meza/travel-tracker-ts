import "./css/styles.scss";
import User from "./clasess/User.ts";
import dayjs from "dayjs";
import { displayTripCards } from "./cards";
import { destinations } from "../test/test-data/destination-test-data.ts";
import { trips } from "../test/test-data/trips-test-data.ts";
import { travelers } from "../test/test-data/user-test-data.ts";
import type {
  TripType,
  DestinationType,
  UserType,
  TripTypePrimative,
  ViewType,
} from "./types.ts";
import {
  makeNewTrip,
  findUsersTrips,
  checkIfInputsAreValid,
  getTripDetails,
  resetData,
  findDestination,
} from "./helpers.ts";

// Global Variables
let currentUser: UserType;

// Query Selectors
const mainTitle = document.getElementById("js-main-title") as HTMLElement,
  mainBox = document.getElementById("js-main") as HTMLElement,
  cardBox = document.getElementById("js-card-box") as HTMLElement,
  accountBtn = document.getElementById("js-account-btn") as HTMLButtonElement,
  homeBtn = document.getElementById("js-home-btn") as HTMLButtonElement,
  newTripForm = document.getElementById("js-new-trip-form") as HTMLElement,
  newTripBtn = document.getElementById("js-new-trip-btn") as HTMLButtonElement,
  newTripInputs = [
    ...document.querySelectorAll("new-trip-input"),
  ] as HTMLInputElement[],
  destinationList = document.getElementById(
    "destinationList"
  ) as HTMLInputElement,
  startDateInput = document.getElementById("js-start-date") as HTMLInputElement,
  endDateInput = document.getElementById("js-end-date") as HTMLInputElement,
  inputErrorDisplay = document.getElementById(
    "js-input-error-display"
  ) as HTMLElement,
  modals = [...document.querySelectorAll(".modal")] as HTMLElement[],
  overlay = document.getElementById("js-overlay") as HTMLElement,
  accountModal = document.getElementById("js-account-modal") as HTMLElement,
  accountInfoInputs = [
    ...document.querySelectorAll(".js-account-info"),
  ] as HTMLInputElement[],
  modalCloseBtns = [
    ...document.querySelectorAll(".close-modal-btn"),
  ] as HTMLButtonElement[],
  logInModal = document.getElementById("js-log-in-modal") as HTMLElement,
  logInBtn = document.getElementById("js-log-in-btn") as HTMLButtonElement,
  logOutBtn = document.getElementById("js-log-out-btn") as HTMLButtonElement,
  logInError = document.getElementById("js-log-in-error") as HTMLElement,
  usernameInput = document.getElementById(
    "js-username-input"
  ) as HTMLInputElement,
  passwordInput = document.getElementById(
    "js-password-input"
  ) as HTMLInputElement,
  allInputs = [...document.querySelectorAll("input")] as HTMLInputElement[],
  tripDetailsView = document.getElementById(
    "js-trip-details-view"
  ) as HTMLElement,
  tripDetailsImg = document.getElementById("js-trip-view-img") as HTMLElement,
  tripDetails = [...document.querySelectorAll(".trip-detail")] as HTMLElement[],
  adBackground = document.getElementById("js-ad-background") as HTMLElement,
  adDestination = document.getElementById("js-ad-destination") as HTMLElement,
  adPrice = document.getElementById("js-ad-price") as HTMLElement,
  destinationInput = document.getElementById(
    "js-destination-input"
  ) as HTMLInputElement;

// DOM functions
const clearAllInputs = () => {
  allInputs.forEach((input) => (input.value = ""));
};

const hideDOM = () => {
  mainBox.hidden = true;
  adBackground.hidden = true;
  cardBox.hidden = true;
  tripDetailsView.hidden = true;
};

const handleNavigation = (viewToShow: ViewType) => {
  clearAllInputs();
  hideDOM();

  switch (viewToShow) {
    case "user": {
      mainBox.hidden = false;
      adBackground.hidden = false;
      cardBox.hidden = false;
      break;
    }
    case "agent": {
      mainBox.hidden = false;
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

const resetDetails = (data: string[], elements: HTMLElement[]) => {
  elements.forEach((elem, index) => {
    elem.innerText = data[index];
  });
};

const closeModals = () => {
  modals.forEach((modal: HTMLElement) => (modal.hidden = true));
  overlay.classList.remove("active-overlay");
};

const populateDestinationList = (destinations: DestinationType[]) => {
  destinations.forEach((destination: DestinationType) => {
    destinationList.innerHTML += `<option value='${destination.location}'>`;
  });
};

const displayRandomDestination = () => {
  const n = Math.floor(Math.random() * 50);
  const ranDest = destinations[n];

  adBackground.style.backgroundImage = `url(${ranDest.image})`;
  adDestination.innerText = ranDest.location.split(", ")[0];
  adPrice.innerHTML = `$${ranDest.estimatedLodgingCostPerDay}/<span class="per-night">per night</span>`;
};

const updateDOMAfterInput = () => {
  displayTripCards(currentUser.trips);
  inputErrorDisplay.hidden = true;
  clearAllInputs();
};

let populateAccountModal = (user: UserType) => {
  let accountInfoInputsData = [
    user.name,
    user.travelerType,
    Math.floor(0),
    user.trips?.length,
  ];

  accountInfoInputs.forEach((elem, index) => {
    elem.innerText += ` ${accountInfoInputsData[index]}`;
  });
};

const displayTripDetailsInfo = (trip: TripType | undefined) => {
  if (!trip) return;

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

const updateDOMForUser = (currentUser: UserType) => {
  mainTitle.innerText = `${currentUser.name.split(" ")[0]}'s Trips`;
  handleNavigation("user");
  populateAccountModal(currentUser);
  displayTripCards(currentUser.trips);
  populateDestinationList(destinations);
  displayRandomDestination();
};

// Event Listeners
// New Trip Inputs/Button Event Listeners

endDateInput.setAttribute("min", dayjs().format("MM-DD-YYYY"));
startDateInput.setAttribute("min", dayjs().format("MM-DD-YYYY"));

startDateInput.addEventListener("change", () => {
  endDateInput.disabled = false;
  endDateInput.setAttribute("min", startDateInput.value);
});

newTripInputs.forEach((input) =>
  input.addEventListener("submit", () => {
    event?.preventDefault();
  })
);

newTripForm.addEventListener("change", () => {
  event?.preventDefault();
  if (checkIfInputsAreValid()) {
    const newDestination = findDestination(destinationInput.value);

    if (newDestination) {
      inputErrorDisplay.hidden = false;
      inputErrorDisplay.innerText = `Estimated Cost: $${
        makeNewTrip(currentUser, newDestination).totalPrice
      }`;
    }
  }
});

newTripBtn.addEventListener("click", () => {
  event?.preventDefault();

  if (checkIfInputsAreValid()) {
    const newDestination = findDestination(destinationInput.value);

    if (newDestination) {
      const newTrip = makeNewTrip(currentUser, newDestination);

      currentUser.trips?.push(newTrip);
      updateDOMAfterInput();
    }
  } else {
    inputErrorDisplay.hidden = false;
    inputErrorDisplay.innerText = "Please fill out all the inputs";
  }
});

//Login Button Listener
logInBtn.addEventListener("click", () => {
  const userNameRegEx = /^(traveler([1-9]|[1-4][0-9]|50)|agent)$/;

  if (
    usernameInput.value &&
    userNameRegEx.test(usernameInput.value) &&
    passwordInput.value === "travel"
  ) {
    closeModals();
    logInError.hidden = true;

    const userId = Number(usernameInput.value.replace(/\D/g, ""));
    const userTrips = findUsersTrips(trips, userId);
    const traveler = travelers.find((user) => user.id == userId);

    if (traveler) currentUser = new User(traveler, userTrips);

    updateDOMForUser(currentUser);
  } else {
    logInError.hidden = false;
    logInError.innerText = "Enter A Valid User Name and Password";
  }
});
accountBtn.addEventListener("click", () => {
  accountModal.removeAttribute("hidden");
  overlay.classList.add("active-overlay");
});

//Other Event Listeners

cardBox.addEventListener("click", () => {
  if (
    event?.target instanceof Element &&
    event?.target?.classList.contains("js-view-details")
  ) {
    homeBtn.hidden = false;
    handleNavigation("trip details");
    displayTripDetailsInfo(getTripDetails(currentUser));
  }
});

homeBtn.addEventListener("click", () => {
  homeBtn.hidden = true;
  resetDetails(resetData("trip"), tripDetails);
  displayRandomDestination();
  handleNavigation("user");
});

modalCloseBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    closeModals();
  })
);

logOutBtn.addEventListener("click", () => {
  resetDetails(resetData("account"), accountInfoInputs);
  handleNavigation("log out");
});
