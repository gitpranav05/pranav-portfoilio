"use client";

import React, { forwardRef, ElementType, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type BoundedProps<C extends ElementType> = {
  as?: C;
  className?: string;
  children?: ReactNode; // ✅ Fix: explicitly allow children
} & HTMLAttributes<HTMLElement>;

const Bounded = forwardRef<HTMLElement, BoundedProps<any>>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp ref={ref} className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)} {...restProps}>
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";

export default Bounded;
