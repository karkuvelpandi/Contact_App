import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorldCovidData,
  getCountryWiseData,
  getCovidGraphData,
} from "./analytics.slice";
import { RootState } from "../../redux";
import { CovidLineChart } from "./components/CovidLineChart";
import { CovidMap } from "./components/CovidMap";

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
  // console.log(worldCovidData);
  console.log(countryWiseData);
  // console.log(covidGraphData);
  useEffect(() => {
    dispatch(getWorldCovidData());
    dispatch(getCountryWiseData());
    dispatch(getCovidGraphData());
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll">
      {covidGraphData && <CovidLineChart />}
      {countryWiseData && <CovidMap />}
    </div>
  );
};
