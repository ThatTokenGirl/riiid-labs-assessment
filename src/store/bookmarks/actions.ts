export const ActionTypes = {
  BOOKMARK: "[BOOKMARKS] Bookmark Item",
  UNBOOKMARK: "[BOOKMARKS] Unbookmark Item",
} as const;

type BookmarkAction = { type: typeof ActionTypes["BOOKMARK"]; id: number };
type UnbookmarkAction = { type: typeof ActionTypes["UNBOOKMARK"]; id: number };

export function bookmark(id: number): BookmarkAction {
  return { type: ActionTypes.BOOKMARK, id };
}

export function unbookmark(id: number): UnbookmarkAction {
  return { type: ActionTypes.UNBOOKMARK, id };
}

export type BookmarksActions = BookmarkAction | UnbookmarkAction;
