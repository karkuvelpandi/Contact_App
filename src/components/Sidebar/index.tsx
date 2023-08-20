import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ContactIcon } from "../../ui/svgs/ContactIcon";
import { DashBoardIcon } from "../../ui/svgs/DashBoardIcon";
import { updateHeaderText } from "../../redux/app.slice";
import { updateSidebarVisibility } from "../../redux/visibility.slice";
import { RootState } from "../../redux";

export const Sidebar = () => {
  const dispatch = useDispatch();
  // Accessing the store data
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );
  const isSidebarVisible = useSelector(
    (state: RootState) => state.visibility.isSidebarVisible
  );

  const onClick = (headerText: string) => {
    dispatch(updateHeaderText(headerText));
    dispatch(updateSidebarVisibility(false));
  };
  return (
    <>
      <section
        className={`w-auto h-full absolute z-10 sm:z-0 sm:h-auto sm:relative sm:block sm:w-52 bg-[#D9D9D9] translate-x-0 ${
          isSidebarVisible ? "block" : "hidden"
        }`}
      >
        <Link
          to="/"
          onClick={() => onClick("Contacts Page")}
          className="flex justify-start items-center gap-1 p-6 hover:scale-105 cursor-pointer"
        >
          <ContactIcon size="25" />
          {!isMobileView && <span className="font-semibold">Contacts</span>}
        </Link>
        <hr />
        <Link
          to="/dashboard"
          onClick={() => onClick("Analytics Dashboard")}
          className="flex justify-start items-center gap-1 p-6 hover:scale-105 cursor-pointer"
        >
          <DashBoardIcon size="25" />
          {!isMobileView && <span className="font-semibold">DashBoard</span>}
        </Link>
        <hr />
      </section>
    </>
  );
};
