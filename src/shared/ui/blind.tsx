import type { PropsWithChildren } from "react";

export const Blind = ({ children }: PropsWithChildren) => {
  return (
    <span className="absolute overflow-hidden size-px -m-px">{children}</span>
  );
};
