import dayjs from "dayjs";
import type { TripType } from "./types";
import { cardBox } from "./queries";

export const displayTripCards = (trips: TripType[]) => {
  cardBox.innerHTML = "";

  trips.forEach((trip) => {
    cardBox.innerHTML += `
      <div class="trip-card js-trip-card" tabindex="0">
        <img class="trip-img js-trip-img" src="${
          trip.destination?.image
        }"alt="${trip.destination?.alt}" >
        <h3 class="card-destination" >${trip.destination?.location}</h3>
        <time class="card-date" name="travel-dates">${dayjs(trip.date).format(
          "MM/DD/YYYY"
        )} - ${trip.endDate}</time>
        <div>
          <h4 class="${trip.status} card-status">${trip.status}</h4>
          <button class="view-details js-view-details" id="${
            trip.id
          }">View Details</button>
        </div>
      </div> `;
  });
};
