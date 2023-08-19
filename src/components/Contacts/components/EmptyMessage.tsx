import React from "react";
import Img from "../../../ui/images/empty.png";

type EmptyMessageProps = {
  message: string;
};
export const EmptyMessage = (props: EmptyMessageProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#D9D9D9] gap-3 w-4/5 sm:w-72 py-8 rounded-sm">
      <img src={Img} alt="" />
      <p className="w-auto text-center p-4">{props.message}</p>
    </div>
  );
};
