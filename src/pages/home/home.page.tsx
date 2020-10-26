import React, { forwardRef } from "react";
import { topstories } from "../../backend/hackernews";
import { StoryContainer } from "../../containers";
import infiniteScroll from "../../hoc/infinitescroller";
import makeViewable from "../../hoc/makeViewable";

const StoryItem = makeViewable<{ item: number }>()(
  forwardRef(({ item }, ref) => {
    return <StoryContainer ref={ref} storyID={item}></StoryContainer>;
  })
);

const HomePage = infiniteScroll({
  loader: (start, end) =>
    topstories(start, end - start).then((data) => data.items),
})(({ item }) => {
  return <StoryItem onVisibleTransition={(c) => console.log(c)} item={item} />;
});

export default HomePage;
