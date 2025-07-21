import "./css/styles.scss";
import User from "./clasess/User.ts";
import Trip from "./clasess/trip.ts";
import dayjs from "dayjs";
import { displayTripCards } from "./cards";
import { destinations } from "../test/test-data/destination-test-data.ts";
import { trips } from "../test/test-data/trips-test-data.ts";
import { travelers } from "../test/test-data/user-test-data.ts";
import type { TripType, DestinationType, UserType, ViewType } from "./types.ts";

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
  numTravelersInput = document.getElementById(
    "js-num-travelers-input"
  ) as HTMLInputElement,
  destinationInput = document.getElementById(
    "js-destination-input"
  ) as HTMLInputElement,
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
  adPrice = document.getElementById("js-ad-price") as HTMLElement;

// Atomic Functions

//convert to react component
let makeNewTrip = (): TripType => {
  const dest_ID = Number(destinationInput?.value) || 0;

  let newDestination = destinations.find(
    (dest: DestinationType) => dest.id === dest_ID
  );

  let newTrip = new Trip(
    {
      id: Date.now(),
      userID: currentUser.id,
      destinationID: dest_ID,
      duration: dayjs(endDateInput.value).diff(
        dayjs(startDateInput.value),
        "days"
      ),
      travelers: Number(numTravelersInput.value),
      status: "pending",
      suggestedActivities: [],
      date: dayjs(startDateInput.value).format("YYYY/MM/DD"),
    },
    newDestination
  );

  return newTrip;
};

const makeTripArray = (data: TripType[], userID?: number) => {
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

const checkIfInputsAreValid = () => {
  const dateRegEx =
    /^(20[0-3][0-9]|2040)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const numRegEx = /^([1-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|36[0-5])$/;

  return newTripInputs.every((input) => input.value) &&
    destinations.find(
      (dest: DestinationType) => dest.destination === destinationInput.value
    ) &&
    dateRegEx.test(`${startDateInput.value}`) &&
    dateRegEx.test(`${endDateInput.value}`) &&
    numRegEx.test(`${numTravelersInput.value}`)
    ? true
    : false;
};

const getTripDetails = (): TripType | undefined => {
  return currentUser.trips?.find(
    (trip: TripType) => trip.id === Number(event?.target?.id)
  );
};

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

let resetDetails = (data: string[], elements: HTMLElement[]) => {
  elements.forEach((elem, index) => {
    elem.innerText = data[index];
  });
};

let resetData = (dataWanted: "trip" | "account") => {
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

let closeModals = () => {
  modals.forEach((modal: HTMLElement) => (modal.hidden = true));
  overlay.classList.remove("active-overlay");
};

let populateDestinationList = (destinations: DestinationType[]) => {
  destinations.forEach((destination: DestinationType) => {
    destinationList.innerHTML += `<option value='${destination.destination}'>`;
  });
};

let displayRandomDestination = () => {
  let randomIndex = Math.floor(Math.random() * 50);
  let randomDestination = destinations[randomIndex];
  adBackground.style.backgroundImage = `url(${randomDestination.image})`;
  adDestination.innerText = randomDestination.destination.split(", ")[0];
  adPrice.innerHTML = `$${randomDestination.estimatedLodgingCostPerDay}/<span class="per-night">per night</span>`;
};

// let updateDOMAfterInput = () => {
//   displayTripCards(currentUser.trips);
//   inputErrorDisplay.hidden = true;
//   clearAllInputs();
// };

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

let displayTripDetailsInfo = (trip: TripType | undefined) => {
  if (!trip) return;

  let tripDetailsData = [
    trip.destination?.destination,
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

let updateDOMForUser = (currentUser: UserType) => {
  mainTitle.innerText = `${currentUser.name.split(" ")[0]}'s Trips`;
  handleNavigation("user");
  populateAccountModal(currentUser);
  displayTripCards(currentUser.trips);
  populateDestinationList(destinations);
  displayRandomDestination();
};

// Event Listeners
// New Trip Inputs/Button Event Listeners

endDateInput.setAttribute("min", dayjs().format("YYYY-MM-DD"));

startDateInput.setAttribute("min", dayjs().format("YYYY-MM-DD"));

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
    inputErrorDisplay.hidden = false;
    inputErrorDisplay.innerText = `Estimated Cost: $${
      makeNewTrip().totalPrice
    }`;
  }
});

newTripBtn.addEventListener("click", () => {
  event?.preventDefault();
  if (checkIfInputsAreValid()) {
    postNewTrip(makeNewTrip()).then(() => {
      if (makeNewTrip()) currentUser.trips?.push(makeNewTrip());
      updateDOMAfterInput();
    });
  } else {
    inputErrorDisplay.hidden = false;
    inputErrorDisplay.innerText = "Please fill out all the inputs";
  }
});

//Login Button Listener

logInBtn.addEventListener("click", () => {
  let userNameRegEx = /^(traveler([1-9]|[1-4][0-9]|50)|agent)$/;

  console.log("test");

  if (
    usernameInput.value &&
    userNameRegEx.test(usernameInput.value) &&
    passwordInput.value === "travel"
  ) {
    closeModals();
    logInError.hidden = true;

    let userId = Number(usernameInput.value.slice(-1));
    let user_trips = makeTripArray(trips, userId);
    const traveler = travelers.find((user) => user.id == userId);

    if (traveler) currentUser = new User(traveler, user_trips);

    updateDOMForUser(currentUser);
  } else {
    logInError.hidden = false;
    logInError.innerText = "Enter A Valid User Name and Password";
  }
});

// Agent Mode Event Listeners

// requestsBox.addEventListener("click", (event) => {
//   if (event.target?.classList.contains("approved")) {
//     updateTrip(
//       currentUser.tripsData.find(
//         (trip: TripType) => trip.id === Number(event.target?.parentNode.id)
//       ),
//       `${event.target.classList}`
//     ).then(() => {
//       fetchGetAll()
//         .then((data) => {
//           handleNavigation("agent");
//           setAgentUser(data, false);
//         })
//         .catch((err) => console.log(err));
//     });
//   } else if (event.target.classList.contains("denied")) {
//     deleteTrip(event.target.parentNode.id).then(() => {
//       fetchGetAll()
//         .then((data) => {
//           handleNavigation("agent");
//           setAgentUser(data, false);
//         })
//         .catch((err) => console.log(err));
//     });
//   }
// });

// searchUsersInput.addEventListener("input", () => {
//   requestsCardsBox.innerHTML = "";
//   if (searchUsersInput.value) {
//     displayRequestCards(filterByStatus(searchByName(), "pending"), currentUser);
//     displayUserCards(filterByStatus(searchByName(), "approved"), currentUser);
//   } else {
//     displayRequestCards(
//       currentUser.tripsData.filter((trip) => trip.status === "pending"),
//       currentUser
//     );
//   }
// });

accountBtn.addEventListener("click", () => {
  accountModal.removeAttribute("hidden");
  overlay.classList.add("active-overlay");
});

// agentNavBtns.forEach((btn) =>
//   btn.addEventListener("click", () => handleAgentNav(event.target.name))
// );

//Other Event Listeners

cardBox.addEventListener("click", () => {
  if (event?.target?.classList.contains("js-view-details")) {
    homeBtn.hidden = false;
    console.log("here");
    handleNavigation("trip details");
    displayTripDetailsInfo(getTripDetails());
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
