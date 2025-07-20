type TripType = {
  id: Date;
  userID: number;
  destinationID: number;
  duration: string;
  travelers: number;
  status: string;
  suggestedActivities?: string[];
  date: Date;
};
