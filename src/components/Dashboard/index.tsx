import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorldCovidData,
  getCountryWiseData,
  getCovidGraphData,
} from "./analytics.slice";
import { RootState } from "../../redux";
import { CovidMap } from "./components/CovidMap";
import { CovidLineChart } from "./components/CovidLineChart";
import { CovidDashboard } from "./components/CovidDashboard";

// Component to render all analytics related UI
export const Dashboard = () => {
  const dispatch = useDispatch();

  const worldCovidData = useSelector(
    (state: RootState) => state.analytics.worldCovidData
  );
  const countryWiseData = useSelector(
    (state: RootState) => state.analytics.countryWiseData
  );
  const covidGraphData = useSelector(
    (state: RootState) => state.analytics.covidGraphData
  );
  //
  useEffect(() => {
    dispatch(getWorldCovidData());
    dispatch(getCountryWiseData());
    dispatch(getCovidGraphData());
  }, [dispatch]);
  //
  return (
    <div className="w-full h-full">
      {worldCovidData && <CovidDashboard />}
      {covidGraphData && <CovidLineChart />}
      {countryWiseData && <CovidMap />}
    </div>
  );
};
