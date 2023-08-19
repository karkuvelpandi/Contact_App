import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { MobileMenu } from "../Sidebar/MobileMenu";
//
type ApplicationHeaderProps = {
  headerText: string;
  textColor?: string;
};

export const ApplicationHeader = (props: ApplicationHeaderProps) => {
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );
  return (
    <div className="h-20 bg-[#718ffc] flex justify-start sm:justify-center items-center relative">
      {isMobileView && (
        <div className="w-16 px-4 pl-7">
          <MobileMenu />
        </div>
      )}
      <p
        style={{ color: props.textColor ?? "black" }}
        className="flex flex-1 justify-center text-3xl sm:text-4xl font-semibold sm:ml-52"
      >
        {props.headerText}
      </p>
    </div>
  );
};
