import { User } from "./user";

export interface Message {
  id?:string;
  userId: string;
  sessionId: string;
  text: string;
  createdAt?: string;
  user?: User;
}