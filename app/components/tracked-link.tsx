"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import type { ComponentProps, MouseEvent } from "react";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** Value sent to Google Analytics as a `button_click` event */
  eventValue: string;
};

/**
 * Client wrapper around `next/link` that fires a `button_click` GA event
 * on click. Use this from Server Components instead of passing `onClick`
 * directly to `Link`, which Next.js disallows at the RSC boundary.
 */
export default function TrackedLink({
  eventValue,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    sendGAEvent("event", "button_click", {
      value: eventValue,
    });
    onClick?.(event);
  };

  return (
    <Link {...rest} onClick={handleClick}>
      {children}
    </Link>
  );
}