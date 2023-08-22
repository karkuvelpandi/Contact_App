import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//
import { ApplicationHeader } from "../components/ApplicationHeader";
import { Sidebar } from "../components/Sidebar";
import { Contacts } from "../components/Contacts";
import { Dashboard } from "../components/Dashboard";
import { RootState } from "../redux";
import { updateSidebarVisibility } from "../redux/visibility.slice";
import { updateHeaderText } from "../redux/app.slice";
//
// Component to render all Contact and dashboard related UI
export const ContactPage = () => {
  const dispatch = useDispatch();
  // Accessing the store
  const appHeaderText = useSelector(
    (state: RootState) => state.app.appHeaderText
  );
  const isSidebarVisible = useSelector(
    (state: RootState) => state.visibility.isSidebarVisible
  );
  //
  useEffect(() => {
    if (window.location.pathname.includes("dashboard")) {
      dispatch(updateHeaderText("Analytics Dashboard"));
    } else {
      dispatch(updateHeaderText("Contact Page"));
    }
  }, [dispatch]);
  //
  return (
    <>
      <main>
        <ApplicationHeader headerText={appHeaderText} />
        <Sidebar />
        <section className="sm:ml-44 h-[calc(100vh-64px)] relative z-0 w-auto overflow-y-auto">
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </section>
        {isSidebarVisible && (
          <div
            onClick={() => dispatch(updateSidebarVisibility(!isSidebarVisible))}
            className="bg-black opacity-50 fixed top-16 h-full inset-x-0 z-0"
          />
        )}
      </main>
    </>
  );
};
