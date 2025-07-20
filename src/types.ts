export type TripType = {
  id: number;
  userID: number;
  destinationID: number;
  duration: number;
  travelers: number;
  status: string;
  date: string;
  suggestedActivities?: string[];
  destination?: DestinationType;
  totalPrice?: number;
  endDate?: string;
};

export type DestinationType = {
  id: number;
  destination: string; // CHANGE THIS TO LOCATION
  estimatedLodgingCostPerDay: number;
  estimatedFlightCostPerPerson: number;
  image: string;
  alt: string;
};

export type UserType = {
  id: number;
  name: string;
  travelerType?: string;
  trips?: TripType[];
};

export type ViewType = "user" | "agent" | "trip details" | "log out";
