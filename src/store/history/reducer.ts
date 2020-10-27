import { HistoryAction, ActionTypes } from "./actions";

const initialState: number[] = [];

export default function bookmarksReducer(
  state = initialState,
  action: HistoryAction
): number[] {
  switch (action.type) {
    case ActionTypes.ADD: {
      const index = state.indexOf(action.id);

      if (!~index) {
        return [...state, action.id];
      }

      return state;
    }

    default:
      return state;
  }
}
