import { Timestamp } from "./Timestamp";

export interface MealEntity {
  id: string;
  userId: string;
  name: string;
  description: string;
  date: Timestamp;
  isInsideDiet: boolean;
}
