import { useContext } from "react";
import { StoreContext } from "../context";
import { bookmark, unbookmark } from "./actions";

export * from "./actions";
export { default as bookmarksReducer } from "./reducer";

export function useBookmarks() {
  const [state, dispatch] = useContext(StoreContext);
  const bookmarks = state.bookmarks ?? [];
  return {
    bookmarks,

    bookmark(id: number) {
      dispatch(bookmark(id));
    },

    unbookmark(id: number) {
      dispatch(unbookmark(id));
    },

    isBookmarked(id: number) {
      return !!~bookmarks.indexOf(id);
    },
  };
}
