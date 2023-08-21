import React from "react";
import { timeAgo } from "../../../utils/general.util";

type DashboardCardDesign = {
  dataCount: number | string;
  title: string;
  svgIcon: any;
  svgIconSize: "sm" | "md" | "lg";
  bgColor: string;
  updatedAt: number;
  excessPoint?: string;
  textColor?: string;
};
// Card component to render world covid analytics data
export const DashboardCard = (props: DashboardCardDesign) => {
  const timeAgoString = timeAgo(props.updatedAt);
  return (
    <div
      className="pageFadeIn w-auto min-w-fit h-36 px-6 py-2 flex flex-1 justify-around items-center shadow-lg rounded-md"
      style={{
        backgroundColor: props.bgColor,
        color: props.textColor ? props.textColor : "black",
      }}
    >
      <img
        src={props.svgIcon}
        alt=""
        className={`${
          props.svgIconSize === "lg"
            ? "w-20 h-20"
            : props.svgIconSize === "md"
            ? "w-16 h-16"
            : "w-12 h-12"
        } w-4/12`}
      />
      <div className="flex flex-col w-8/12 flex-nowrap">
        <p className=" text-base sm:text-lg">{props.title}</p>
        <p className="text-xl sm:text-3xl font-semibold">{props.dataCount}</p>
        {props.excessPoint && (
          <p className=" text-base sm:text-lg">{props.excessPoint}</p>
        )}
        <p className=" text-xs sm:text-sm italic text-black-400">
          {" "}
          {timeAgoString}
        </p>
      </div>
    </div>
  );
};
