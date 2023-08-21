import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { MobileMenu } from "../Sidebar/MobileMenu";
//
type ApplicationHeaderProps = {
  headerText: string;
  textColor?: string;
};
//
// Contact app main header
export const ApplicationHeader = (props: ApplicationHeaderProps) => {
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );
  return (
    <div className="pageFadeIn h-16 bg-[#718ffc] flex justify-start sm:justify-center items-center relative top-0 left-0">
      {isMobileView && (
        <div className="w-16 px-4 pl-7">
          <MobileMenu />
        </div>
      )}
      <p
        style={{ color: props.textColor ?? "black" }}
        className="flex flex-1 justify-center text-xl sm:text-2xl font-semibold sm:ml-44"
      >
        {props.headerText}
      </p>
    </div>
  );
};
