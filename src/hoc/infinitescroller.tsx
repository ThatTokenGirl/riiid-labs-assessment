import React, { ComponentType, useEffect, useState } from "react";

type InfiniteScrollProps<T> = {
  loader: (start: number, end: number) => T[] | Promise<T[]>;
  numberToLoad?: number;
  loadingIndicator?: React.ReactElement;
  key?: (item: T, index: number) => any;
};

export default function infiniteScroll<T, Props extends {}>(
  Component: ComponentType<Props & { item: T }>
): ComponentType<InfiniteScrollProps<T> & Props> {
  return ({
    loader,
    numberToLoad = 10,
    loadingIndicator = <span>Loading...</span>,
    key = (_, index) => index,
    ...props
  }) => {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
      const handler = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          setStartIndex((prev) => prev + numberToLoad!);
        }
      };

      window.addEventListener("scroll", handler);

      return () => window.removeEventListener("scroll", handler);
    }, [numberToLoad]);

    useEffect(() => {
      const fetchItems = async (start: number, end: number) => {
        setLoading(true);
        const items = await Promise.resolve(loader(start, end));

        setItems((prev) => [...prev, ...items]);
        setLoading(false);
      };

      fetchItems(startIndex, startIndex + numberToLoad!);
    }, [startIndex, numberToLoad, loader]);

    return (
      <>
        {items.map((item, index) => (
          <Component
            key={key!(item, index)}
            item={item}
            {...(props as Props)}
          />
        ))}
        {loading && loadingIndicator}
      </>
    );
  };
}
