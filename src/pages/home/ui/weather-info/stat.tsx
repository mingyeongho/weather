import type { PropsWithChildren } from "react";

const Stat = ({ children }: PropsWithChildren) => {
  return <dl className="flex items-center gap-0.5">{children}</dl>;
};

const Label = ({ children }: PropsWithChildren) => {
  return <dt className="text-sm">{children}</dt>;
};

const Value = ({ children }: PropsWithChildren) => {
  return <dd className="font-bold">{children}</dd>;
};

Stat.Label = Label;
Stat.Value = Value;
export default Stat;
