import React from "react";
type CloseIconProps = {
  size: string;
};
export const CloseIcon = (props: CloseIconProps) => {
  return (
    <svg
      style={{ height: props.size, width: props.size }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.94886 0L0 1.94886L10.0511 12L0 22.0511L1.94886 24L12 13.9489L22.0511 24L24 22.0511L13.9489 12L24 1.94886L22.0511 0L12 10.0511L1.94886 0Z"
        fill="black"
      />
    </svg>
  );
};
