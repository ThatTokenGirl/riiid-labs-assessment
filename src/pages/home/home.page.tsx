import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { topstories } from "../../backend/hackernews";
import { PageHeader } from "../../components";
import { StoryContainer } from "../../containers";
import infiniteScroll from "../../hoc/infinitescroller";
import makeViewable from "../../hoc/makeViewable";
import { useStoryHistory } from "../../store/history";

const StoryItem = makeViewable<{ item: number }>()(
  forwardRef(({ item }, ref) => {
    return <StoryContainer ref={ref} storyID={item}></StoryContainer>;
  })
);

const StoriesContainer = infiniteScroll<number, {}>(
  ({ item }: { item: number }) => {
    const { add } = useStoryHistory();
    const [visibility, setVisibility] = useState(false);
    const pastVisibilityRef = useRef(visibility);

    const visibilityChangeHandler = (visible: boolean) => {
      setVisibility(visible);
    };

    useEffect(() => {
      if (pastVisibilityRef.current && !visibility) {
        add(item);
      }

      pastVisibilityRef.current = visibility;
    }, [item, add, visibility, pastVisibilityRef]);

    return <StoryItem onVisibleChange={visibilityChangeHandler} item={item} />;
  }
);

const HomePage = () => {
  const [stories, setStories] = useState<number[]>([]);
  const [filtered, setFiltered] = useState<number[]>([]);
  const { history } = useStoryHistory();
  const historyRef = useRef(history || []);

  useEffect(() => {
    const fetch = async () => {
      const { items } = await topstories(0, 500);

      setStories(items);
    };

    fetch();
  }, []);

  useEffect(() => {
    setFiltered(stories.filter((x) => !~historyRef.current.indexOf(x)));
  }, [stories]);

  const loader = useCallback(
    async (start: number, end: number) => {
      return filtered.slice(start, end);
    },
    [filtered]
  );

  return filtered.length ? (
    <StoriesContainer loader={loader}></StoriesContainer>
  ) : (
    <PageHeader>No new stories to show</PageHeader>
  );
};

export default HomePage;
