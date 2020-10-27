import React, { PropsWithChildren, useContext, useReducer } from "react";
import { combineReducers } from "redux";
import { bookmarksReducer } from "./bookmarks";
import { initialState, StoreContext } from "./context";
import { historyReducer } from "./history";
import { notificationsReducer } from "./notifications";

export * from "./bookmarks";

export const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  notifications: notificationsReducer,
  history: historyReducer,
});

export const StoreProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
