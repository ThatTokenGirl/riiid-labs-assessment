export const ActionTypes = {
  BOOKMARK: "BOOKMARK",
  UNBOOKMARK: "UNBOOKMARK",
} as const;

type BookmarkAction = { type: typeof ActionTypes["BOOKMARK"]; id: number };
type UnbookmarkAction = { type: typeof ActionTypes["UNBOOKMARK"]; id: number };

export function bookmark(id: number): BookmarkAction {
  return { type: "BOOKMARK", id };
}

export function unbookmark(id: number): UnbookmarkAction {
  return { type: "UNBOOKMARK", id };
}

export type BookmarksActions = BookmarkAction | UnbookmarkAction;
