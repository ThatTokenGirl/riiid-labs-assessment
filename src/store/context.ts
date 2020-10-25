import { createContext, Dispatch } from "react";
import { Notification } from "./notifications/actions";

export const initialState: {
  bookmarks: number[];
  notifications: Notification[];
} = { bookmarks: [], notifications: [] };
export const StoreContext = createContext<[typeof initialState, Dispatch<any>]>(
  [initialState, () => initialState]
);
