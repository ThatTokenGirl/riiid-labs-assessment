export const ActionTypes = {
  ADD: "[HISTORY] Add Item",
} as const;

type AddAction = { type: typeof ActionTypes["ADD"]; id: number };

export function add(id: number): AddAction {
  return { type: ActionTypes.ADD, id };
}

export type HistoryAction = AddAction;
