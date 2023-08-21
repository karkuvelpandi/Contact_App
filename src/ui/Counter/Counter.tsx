import React, { useEffect, useState } from "react";
type CounterProps = {
  targetValue: number;
  durationInMillisecond: number;
  className?: string;
};
// Component used to render giver number counting from zero with the given mean time
export const Counter = (props: CounterProps) => {
  const [count, setCount] = useState(0);

  return <div className={props.className}>{count}</div>;
};
