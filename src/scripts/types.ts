export type TripTypePrimative = {
  id: number;
  userID: number;
  destinationID: number;
  duration: number;
  travelers: number;
  status: string;
  date: string;
  suggestedActivities: string[];
};

export type TripType = TripTypePrimative & {
  destination: DestinationType;
  totalPrice: number;
  endDate: string;
};

export type DestinationType = {
  id: number;
  location: string;
  estimatedLodgingCostPerDay: number;
  estimatedFlightCostPerPerson: number;
  image: string;
  alt: string;
};

export type UserTypePrimative = {
  id: number;
  name: string;
  travelerType: string;
};

export type UserType = UserTypePrimative & {
  trips: TripType[];
  totalSpentOnTrips: (trips: TripType[]) => number;
};

export type ViewType = "user" | "agent" | "trip details" | "log out";

export type PriceEstimateType = {
  id: 0;
  date: string;
  endDate: string;
  travelers: number;
};

export type AgentType = {
  name: string;
  users: UserTypePrimative[];
  trips: TripType[];
  destinations: DestinationType[];
};
