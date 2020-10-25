import axios from "axios";
import { RequestPage } from "../models";

type HackerNewItemStory = {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

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

export async function getItem(id: number) {
  const response = await axios.get<HackerNewItemStory>(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  const { data } = response;

  return data;
}
