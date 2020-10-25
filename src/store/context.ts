import { createContext, Dispatch } from "react";

export const initialState: { bookmarks: number[] } = { bookmarks: [] };
export const StoreContext = createContext<[typeof initialState, Dispatch<any>]>(
  [initialState, () => initialState]
);
