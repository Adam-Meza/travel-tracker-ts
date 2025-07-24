import dayjs from "dayjs";

// Wrapper Elements
export const mainTitle = document.getElementById(
  "js-main-title"
) as HTMLElement;
export const mainBox = document.getElementById("js-main") as HTMLElement;
export const cardBox = document.getElementById("js-card-box") as HTMLElement;

// Trip Details View Elements
export const tripDetailsView = document.getElementById(
  "js-trip-details-view"
) as HTMLElement;
export const tripDetailsImg = document.getElementById(
  "js-trip-view-img"
) as HTMLElement;

export const tripDetails = [
  ...document.querySelectorAll(".trip-detail"),
] as HTMLElement[];

// New Trip Input Elements
export const allInputs = [
  ...document.querySelectorAll("input"),
] as HTMLInputElement[];

export const newTripForm = document.getElementById(
  "js-new-trip-form"
) as HTMLElement;
export const endDateInput = document.getElementById(
  "js-end-date"
) as HTMLInputElement;
export const newTripBtn = document.getElementById(
  "js-new-trip-btn"
) as HTMLButtonElement;
export const newTripInputs = [
  ...document.querySelectorAll("new-trip-input"),
] as HTMLInputElement[];

export const numTravelersInput = document.getElementById(
  "js-num-travelers-input"
) as HTMLInputElement;

export const destinationList = document.getElementById(
  "destinationList"
) as HTMLInputElement;

export const startDateInput = document.getElementById(
  "js-start-date"
) as HTMLInputElement;

export const inputErrorDisplay = document.getElementById(
  "js-input-error-display"
) as HTMLElement;

export const destinationInput = document.getElementById(
  "js-destination-input"
) as HTMLInputElement;

//Header Elements
export const accountBtn = document.getElementById(
  "js-account-btn"
) as HTMLButtonElement;
export const homeBtn = document.getElementById(
  "js-home-btn"
) as HTMLButtonElement;

// Modal ELements
export const modals = [...document.querySelectorAll(".modal")] as HTMLElement[];
export const overlay = document.getElementById("js-overlay") as HTMLElement;
export const accountModal = document.getElementById(
  "js-account-modal"
) as HTMLElement;
export const logInModal = document.getElementById(
  "js-log-in-modal"
) as HTMLElement;
export const logInBtn = document.getElementById(
  "js-log-in-btn"
) as HTMLButtonElement;
export const logInError = document.getElementById(
  "js-log-in-error"
) as HTMLElement;
export const logOutBtn = document.getElementById(
  "js-log-out-btn"
) as HTMLButtonElement;
export const usernameInput = document.getElementById(
  "js-username-input"
) as HTMLInputElement;
export const passwordInput = document.getElementById(
  "js-password-input"
) as HTMLInputElement;

export const accountInfoInputs = [
  ...document.querySelectorAll(".js-account-info"),
] as HTMLInputElement[];
export const modalCloseBtns = [
  ...document.querySelectorAll(".close-modal-btn"),
] as HTMLButtonElement[];

// Advertisment
export const adBackground = document.getElementById(
  "js-ad-background"
) as HTMLElement;
export const adDestination = document.getElementById(
  "js-ad-destination"
) as HTMLElement;
export const adPrice = document.getElementById("js-ad-price") as HTMLElement;

// Agent Mode

export const agentViewContainer = document.getElementById(
  "js-agent-container"
) as HTMLElement;
export const agentTitle = document.getElementById(
  "js-agent-title"
) as HTMLElement;
export const yearlyProfitChart = document.getElementById(
  "js-yearly-profit-chart"
) as HTMLCanvasElement;
export const financesBox = document.getElementById(
  "js-finances-box"
) as HTMLElement;
export const financesBtn = document.getElementById(
  "js-finances-btn"
) as HTMLButtonElement;
export const requestsBox = document.getElementById(
  "js-request-box"
) as HTMLElement;
export const requestsCardsBox = document.getElementById(
  "js-requests-cards-box"
) as HTMLElement;
export const searchUsersInput = document.getElementById(
  "js-agent-serach-input"
) as HTMLElement;
export const requestBtn = document.getElementById(
  "js-request-btn"
) as HTMLButtonElement;
export const agentNavBtns = [
  ...document.querySelectorAll(".agent-nav-btn"),
] as HTMLButtonElement[];
export const financesDataPoints = [
  ...document.querySelectorAll(".js-finances-data"),
] as HTMLElement[];
