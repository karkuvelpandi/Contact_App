import React, { useEffect, useState } from "react";
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
  //
  const [activeTab, setActiveTab] = useState<number>(1);

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
      <div className="flex justify-center sm:justify-start sticky top-2 z-20 items-center text-semibold mt-2 ml-2">
        <span
          className={`p-2 px-3 cursor-pointer font-semibold ${
            activeTab === 1
              ? "bg-blue-300 border-b-2 border-b-red-600 scale-[1.05]"
              : "bg-slate-300"
          }`}
          onClick={() => setActiveTab(1)}
        >
          DashBoard
        </span>
        <span
          className={`p-2 px-3 cursor-pointer font-semibold ${
            activeTab === 2
              ? "bg-blue-300 border-b-2 border-b-red-600 scale-[1.05]"
              : "bg-slate-300 "
          }`}
          onClick={() => setActiveTab(2)}
        >
          Chart
        </span>
        <span
          className={`p-2 px-3 cursor-pointer font-semibold ${
            activeTab === 3
              ? " bg-blue-300 border-b-2 border-b-red-600 scale-[1.05]"
              : "bg-slate-300"
          }`}
          onClick={() => setActiveTab(3)}
        >
          Map
        </span>
      </div>
      {activeTab === 1 && worldCovidData && <CovidDashboard />}
      {activeTab === 2 && covidGraphData && <CovidLineChart />}
      {activeTab === 3 && countryWiseData && <CovidMap />}
    </div>
  );
};
