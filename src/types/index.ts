/**
 * Defines the structure for a user-created gas price alert.
 */
export interface Alert {
  id: string;
  condition: "below" | "above";
  threshold: number;
  email: boolean;
  push: boolean;
  active: boolean;
}
