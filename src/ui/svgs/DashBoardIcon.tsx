import React from "react";
type DashBoardIconProps = {
  size: string;
  color?: string;
  colorOnHover?: string;
};
export const DashBoardIcon = (props: DashBoardIconProps) => {
  return (
    <div className="">
      <svg
        style={{ height: props.size, width: props.size }}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2_17)">
          <path
            d="M39.5833 10.4167V14.5833H31.25V10.4167H39.5833ZM18.75 10.4167V22.9167H10.4167V10.4167H18.75ZM39.5833 27.0833V39.5833H31.25V27.0833H39.5833ZM18.75 35.4167V39.5833H10.4167V35.4167H18.75ZM43.75 6.25H27.0833V18.75H43.75V6.25ZM22.9167 6.25H6.25V27.0833H22.9167V6.25ZM43.75 22.9167H27.0833V43.75H43.75V22.9167ZM22.9167 31.25H6.25V43.75H22.9167V31.25Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_2_17">
            <rect width="50" height="50" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
