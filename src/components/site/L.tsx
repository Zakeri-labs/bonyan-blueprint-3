import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type LinkRest = Omit<ComponentProps<typeof Link>, "to" | "hash">;

/** Link wrapper that accepts a runtime-built path string (used for /ar mirrored routes). */
export function L({
  to,
  hash,
  children,
  ...rest
}: { to: string; hash?: string | undefined; children?: ReactNode } & LinkRest) {
  return (
    <Link to={to as never} {...(hash ? { hash } : {})} {...rest}>
      {children}
    </Link>
  );
}
