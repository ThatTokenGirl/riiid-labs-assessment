import React, { ComponentType, useEffect, useRef } from "react";
import { useIsVisible } from "../hooks";

type MakeViewableProps<T> = T & {
  onVisibleChange?: (visible: boolean) => void;
};

export default function makeViewable<TProps>(props?: { rootMargin?: string }) {
  const rootMargin = props?.rootMargin ?? "0%";

  return (
    Component: ComponentType<TProps>
  ): ComponentType<MakeViewableProps<TProps>> => {
    return ({ onVisibleChange, ...props }: MakeViewableProps<TProps>) => {
      const ref = useRef();
      const visible = useIsVisible({ ref, rootMargin });

      useEffect(() => {
        if (onVisibleChange) {
          onVisibleChange(visible);
        }
      }, [visible, onVisibleChange]);

      return <Component ref={ref} {...(props as TProps)} />;
    };
  };
}
