import { BookmarksActions, ActionTypes } from "./actions";

const initialState: number[] = [];

export default function bookmarksReducer(
  state = initialState,
  action: BookmarksActions
): number[] {
  switch (action.type) {
    case ActionTypes.BOOKMARK: {
      const { id } = action;
      const index = state.findIndex((x) => x === id);

      if (!~index) {
        return [...state, id];
      }

      return state;
    }

    case ActionTypes.UNBOOKMARK: {
      const { id } = action;
      const index = state.findIndex((x) => x === id);

      if (!!~index) {
        return state.filter((x) => x !== id);
      }

      return state;
    }

    default:
      return state;
  }
}
