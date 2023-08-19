import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//
import { ApplicationHeader } from "../components/ApplicationHeader";
import { Sidebar } from "../components/Sidebar";
import { Contacts } from "../components/Contacts";
import { Dashboard } from "../components/Dashboard";
import { RootState } from "../redux";
import { updateSidebarVisibility } from "../redux/visibility.slice";
//
export const ContactPage = () => {
  const dispatch = useDispatch();
  // Accessing the store
  const appHeaderText = useSelector(
    (state: RootState) => state.app.appHeaderText
  );
  const isSidebarVisible = useSelector(
    (state: RootState) => state.visibility.isSidebarVisible
  );
  return (
    <>
      <main className=" min-h-screen min-w-full flex flex-col">
        <ApplicationHeader
          headerText={appHeaderText ? appHeaderText : "Contacts Page"}
        />
        <section className=" h-auto w-full flex flex-1 justify-start">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          {isSidebarVisible && (
            <div
              onClick={() =>
                dispatch(updateSidebarVisibility(!isSidebarVisible))
              }
              className="bg-black opacity-30 absolute top-20 bottom-0 inset-x-0 z-0"
            />
          )}
        </section>
      </main>{" "}
    </>
  );
};
