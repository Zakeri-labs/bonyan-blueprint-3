import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type LinkRest = Omit<ComponentProps<typeof Link>, "to">;

/** Link wrapper that accepts a runtime-built path string (used for /ar mirrored routes). */
export function L({ to, children, ...rest }: { to: string; children?: ReactNode } & LinkRest) {
  return (
    <Link to={to as never} {...rest}>
      {children}
    </Link>
  );
}
