import React from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { updateHeaderText } from "../../redux/app.slice";
import contactIcon from "../../ui/svgs/contactIcon.svg";
import dashBoardIcon from "../../ui/svgs/dashboardIcon.svg";
import { updateSidebarVisibility } from "../../redux/visibility.slice";

// Side navigation for contact and dashboard section
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
        className={`pageInEffectRight sm:w-44 h-full fixed z-10 sm:block bg-[#D9D9D9] translate-x-0 ${
          isSidebarVisible ? "block" : "hidden"
        }`}
      >
        <Link
          to="/"
          onClick={() => onClick("Contacts Page")}
          className="flex justify-start items-center gap-1 p-6 hover:scale-105 cursor-pointer"
        >
          <img src={contactIcon} height="25px" width="25px" alt="" />
          {!isMobileView && <span className="font-semibold">Contacts</span>}
        </Link>
        <hr />
        <Link
          to="/dashboard"
          onClick={() => onClick("Analytics Dashboard")}
          className="flex justify-start items-center gap-1 p-6 hover:scale-105 cursor-pointer"
        >
          <img src={dashBoardIcon} height="25px" width="25px" alt="" />
          {!isMobileView && <span className="font-semibold">DashBoard</span>}
        </Link>
        <hr />
      </section>
    </>
  );
};
