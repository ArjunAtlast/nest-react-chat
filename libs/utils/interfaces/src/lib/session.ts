import { Message } from "./message";
import { Product } from "./product";
import { User } from "./user";

export interface Session {
  id?: string;
  productId: string;
  userId: string;
  product?: Product;
  user?: User;
  chats?: Message[];
}