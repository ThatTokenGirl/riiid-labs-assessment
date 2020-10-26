import React, { ComponentType, useEffect, useRef } from "react";
import { useIsVisible } from "../hooks";

type MakeViewableProps<T> = T & {
  onVisibleTransition?: (visible: boolean) => void;
};

export default function makeViewable<TProps>(props?: { rootMargin?: string }) {
  const rootMargin = props?.rootMargin ?? "0%";

  return (
    Component: ComponentType<TProps>
  ): ComponentType<MakeViewableProps<TProps>> => {
    return ({ onVisibleTransition, ...props }: MakeViewableProps<TProps>) => {
      const ref = useRef();
      const visible = useIsVisible({ ref, rootMargin });

      useEffect(() => {
        if (onVisibleTransition) {
          onVisibleTransition(visible);
        }
      }, [visible, onVisibleTransition]);

      return <Component ref={ref} {...(props as TProps)} />;
    };
  };
}
