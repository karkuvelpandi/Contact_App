import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux";
//
import { setAppOffline } from "./redux/app.slice";
import { ContactPage } from "./pages/ContactPage";
import { useWindowSize } from "./hooks/useWindowSize";
import { switchMobileView } from "./redux/visibility.slice";
import { getAllContacts } from "./components/Contacts/contacts.slice";

const App = () => {
  const dispatch = useDispatch();
  const [windowWidth] = useWindowSize();
  // Accessing the store
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );

  // Updating Network availability while loading the app
  useEffect(() => {
    const listenOnline = () => dispatch(setAppOffline(false));
    const listenOffline = () => dispatch(setAppOffline(true));
    window.addEventListener("online", listenOnline);
    window.addEventListener("offline", listenOffline);
    return () => {
      window.removeEventListener("online", listenOnline);
      window.removeEventListener("offline", listenOffline);
    };
  }, [dispatch]);

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
  }, []);

  return (
    <>
      <ContactPage />;
    </>
  );
};

export default App;
