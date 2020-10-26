import { MutableRefObject, useEffect, useState } from "react";

type InViewportProps = { ref: MutableRefObject<any>; rootMargin?: string };
export default function useInViewport({ ref, rootMargin }: InViewportProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, rootMargin]);

  return visible;
}
