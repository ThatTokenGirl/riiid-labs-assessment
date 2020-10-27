import React from "react";
import { PageHeader } from "../../components";
import { StoryContainer } from "../../containers";
import infiniteScroll from "../../hoc/infinitescroller";
import { useStoryHistory } from "../../store/history";

const HistoryContainer = infiniteScroll<number, {}>(({ item }) => (
  <StoryContainer storyID={item}></StoryContainer>
));

const HistoryPage = () => {
  const { history } = useStoryHistory();

  return history.length ? (
    <HistoryContainer loader={(start, end) => history.slice(start, end)} />
  ) : (
    <PageHeader>No items have been archived</PageHeader>
  );
};

export default HistoryPage;
