import React from "react";
import { topstories } from "../../backend/hackernews";
import { StoryContainer } from "../../containers";
import infiniteScroll from "../../hoc/infinitescroller";

const HomePage = infiniteScroll({
  loader: (start, end) =>
    topstories(start, end - start).then((data) => data.items),
})(({ item }) => <StoryContainer storyID={item}></StoryContainer>);

export default HomePage;
