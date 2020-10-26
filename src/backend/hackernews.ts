import axios from "axios";
import { RequestPage } from "../models";

type _HackerNewItem = {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  time: number;
  title: string;
};

export type HackerNewItemStory = _HackerNewItem & {
  type: "story";
  title: string;
  url: string;
  score: number;
};

export type HackerNewItemComment = _HackerNewItem & {
  type: "comment";
  text: string;
  parent: number;
};

export type HackerNewsItem = HackerNewItemStory | HackerNewItemComment;

export async function topstories(
  start: number,
  take: number
): Promise<RequestPage<number>> {
  const all = await axios
    .get<number[]>("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(({ data }) => data);
  const total = all.length;

  return {
    total,
    items: all.slice(start, start + take),
  };
}

export function getItem(
  id: number,
  options: { type: "story" }
): Promise<HackerNewItemStory>;
export function getItem(
  id: number,
  options: { type: "comment" }
): Promise<HackerNewItemComment>;
export function getItem(id: number): Promise<HackerNewsItem>;

export async function getItem(
  id: number,
  options?: { type: "story" | "comment" }
): Promise<HackerNewsItem> {
  const response = await axios.get<HackerNewItemStory>(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  const { data } = response;

  return data;
}
