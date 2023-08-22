import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux";
//
import { setAppOffline } from "./redux/app.slice";
import { ContactPage } from "./pages/ContactPage";
import { useWindowSize } from "./hooks/useWindowSize";
import { switchMobileView } from "./redux/visibility.slice";
import { getAllContacts } from "./components/Contacts/contacts.slice";

// Main component
const App = () => {
  const [showBadge, setShowBadge] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [windowWidth] = useWindowSize();
  // Accessing the store
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );
  const isOffline = useSelector((state: RootState) => state.app.isOffline);

  // Updating Network availability while loading the app
  useEffect(() => {
    const listenOnline = () => {
      dispatch(setAppOffline(false));
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 2500);
    };
    const listenOffline = () => {
      dispatch(setAppOffline(true));
      setShowBadge(true);
    };
    window.addEventListener("online", listenOnline);
    window.addEventListener("offline", listenOffline);
    return () => {
      window.removeEventListener("online", listenOnline);
      window.removeEventListener("offline", listenOffline);
    };
  }, [dispatch]);
  // Updating view port size on mobile browser to neglect the search bar white space issue
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  // Updating device channel using screen size
  useEffect(() => {
    if (windowWidth <= 640) {
      if (!isMobileView) dispatch(switchMobileView(true));
    } else {
      if (isMobileView) dispatch(switchMobileView(false));
    }
  }, [dispatch, isMobileView, windowWidth]);

  // Get all contacts while loading the App
  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  return (
    <>
      <div
        className={` transition-transform duration-100 animate-pulse fixed bottom-2 left-10 z-50 inline-block p-2 px-4 text-white rounded-lg ${
          isOffline ? "bg-red-600" : "bg-green-600"
        }
          ${showBadge ? "translate-x-0" : "-translate-x-36"}
          `}
      >
        {isOffline ? "Offline" : "Online"}
      </div>
      <ContactPage />;
    </>
  );
};

export default App;
