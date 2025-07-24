import "./css/styles.scss";
import Agent from "./clasess/Agent.ts";
import User from "./clasess/User.ts";
import { travelers } from "../test/test-data/user-test-data.ts";
import { trips } from "../test/test-data/trips-test-data.ts";
import { destinations } from "../test/test-data/destination-test-data.ts";
import {
  getTripDetails,
  resetData,
  findUsersTrips,
} from "./scripts/helpers.ts";
import {
  postPriceEstimate,
  handlePostingNewTrip,
  updateDOMForAgent,
} from "./scripts/event-handlers.ts";

import {
  handleNavigation,
  updateDOMForLogin,
  closeModals,
  displayTripDetailsInfo,
  displayRandomDestination,
  resetDetails,
  displayLogInError,
  handleAgentNav,
} from "./scripts/DOMManipulators.ts";

import {
  startDateInput,
  endDateInput,
  newTripBtn,
  newTripForm,
  newTripInputs,
  cardBox,
  homeBtn,
  accountBtn,
  accountModal,
  accountInfoInputs,
  passwordInput,
  tripDetails,
  modalCloseBtns,
  usernameInput,
  logInBtn,
  logOutBtn,
  overlay,
  agentNavBtns,
  requestsBox,
  searchUsersInput,
} from "./scripts/queries.ts";
import type { UserType } from "./scripts/types.ts";
import dayjs from "dayjs";

// Global Variable
let currentUser: UserType;
let agent: Agent;

// Event Listeners
// New Trip Inputs/Button Event Listeners
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
  postPriceEstimate();
});

newTripBtn.addEventListener("click", () => {
  event?.preventDefault();
  handlePostingNewTrip(currentUser);
});

endDateInput.setAttribute("min", dayjs().format("MM-DD-YYYY"));
startDateInput.setAttribute("min", dayjs().format("MM-DD-YYYY"));

//Login Button Listener
logInBtn.addEventListener("click", () => {
  const usernameRegEx = /^(traveler([1-9]|[1-4][0-9]|50)|agent)$/;
  const username = usernameInput.value;

  if (
    username &&
    usernameRegEx.test(username) &&
    passwordInput.value === "travel"
  ) {
    if (username === "agent") {
      agent = new Agent(travelers, findUsersTrips(trips), destinations);

      handleNavigation("agent");
      updateDOMForAgent(agent);
    } else {
      const userId = Number(username.replace(/\D/g, ""));
      const userTrips = findUsersTrips(trips, userId);
      const traveler = travelers.find((user) => user.id == userId);

      if (traveler) {
        currentUser = new User(traveler, userTrips);
        updateDOMForLogin(currentUser);
      }
    }
  } else {
    displayLogInError();
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

    const trips = getTripDetails(currentUser);
    if (trips) displayTripDetailsInfo(trips);
  }
});

homeBtn.addEventListener("click", () => {
  resetDetails(resetData("trip"), tripDetails);
  displayRandomDestination();
  handleNavigation("user", currentUser);
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

// Agent Mode Event Listeners

requestsBox.addEventListener("click", (event) => {
  if (event?.target instanceof Element) {
    if (event.target.classList.contains("approved")) {
      // updateTrip(
      //   currentUser.tripsData.find(
      //     (trip) => trip.id === Number(event.target.parentNode.id)
      //   ),
      //   `${event.target.classList}`
      // )
      // handleNavigation("agent");
      // setAgentUser(data, false);
    } else if (event.target.classList.contains("denied")) {
      // handleNavigation("agent");
      // setAgentUser(data, false);
    }
  }
});

searchUsersInput.addEventListener("input", () => {
  // requestsCardsBox.innerHTML = "";
  // if (searchUsersInput.value) {
  //   displayRequestCards(filterByStatus(searchByName(), "pending"), currentUser);
  //   displayUserCards(filterByStatus(searchByName(), "approved"), currentUser);
  // } else {
  //   displayRequestCards(
  //     currentUser.tripsData.filter((trip) => trip.status === "pending"),
  //     currentUser
  //   );
  // }
});

accountBtn.addEventListener("click", () => {
  accountModal.classList.add("active");
  overlay.classList.add("active-overlay");
});

agentNavBtns.forEach((btn) =>
  btn.addEventListener("click", () => handleAgentNav("test"))
);
