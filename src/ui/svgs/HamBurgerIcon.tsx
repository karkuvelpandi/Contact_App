import React from "react";

type HamBurgerIconProps = {
  height: string;
  width: string;
};
export const HamBurgerIcon = (props: HamBurgerIconProps) => {
  return (
    <svg
      style={{ height: props.height, width: props.width }}
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0V3.42857H32V0H0ZM0 10.2857V13.7143H32V10.2857H0ZM0 20.5714V24H32V20.5714H0Z"
        fill="black"
      />
    </svg>
  );
};
