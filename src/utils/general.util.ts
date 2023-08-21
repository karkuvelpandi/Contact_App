import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { MarkerData } from "../types/dashboard";

// Utility function to check the email whether its valid or not
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Transform function to transform available data to desirable structure.
export const transformMarkerData = (markerData: any): MarkerData[] => {
  return markerData.map((data: any) => {
    let lati = data.countryInfo.lat;
    let long = data.countryInfo.long;
    let popupData = {
      flagUrl: data.countryInfo.flag,
      country: data.country,
      active: data.active,
      recovered: data.recovered,
      deaths: data.deaths,
    };
    return {
      geoCode: [lati, long],
      popUp: popupData,
    };
  });
};
