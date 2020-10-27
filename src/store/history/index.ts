import { useContext } from "react";
import { StoreContext } from "../context";
import { add } from "./actions";

export * from "./actions";
export { default as historyReducer } from "./reducer";

export function useStoryHistory() {
  const [state, dispatch] = useContext(StoreContext);
  const history = state.history ?? [];
  return {
    history,

    add(id: number) {
      dispatch(add(id));
    },
  };
}
