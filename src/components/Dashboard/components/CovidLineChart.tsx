import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { AsyncState } from "../../../types";
import { Loader } from "../../../ui/Loader/Loader";

// Component for render line chart of covid fluctuations over a period of time.
export const CovidLineChart = () => {
  const [dateCategory, setDateCategory] = useState<string[]>();
  const [casesData, setCasesData] = useState<number[]>();
  const [deathData, setDeathData] = useState<number[]>();
  const [recoveryData, setRecoveryData] = useState<number[]>();

  const covidGraphData = useSelector(
    (state: RootState) => state.analytics.covidGraphData
  );
  const covidGraphDataStatus = useSelector(
    (state: RootState) => state.analytics.covidGraphDataStatus
  );
  //
  useEffect(() => {
    if (covidGraphDataStatus === AsyncState.FULFILLED && covidGraphData) {
      let dateCategory = Object.keys(covidGraphData.cases);
      let casesData = Object.values(covidGraphData.cases);
      let deathData = Object.values(covidGraphData.deaths);
      let recoveryData = Object.values(covidGraphData.recovered);
      setDateCategory(dateCategory);
      setCasesData(casesData as number[]);
      setDeathData(deathData as number[]);
      setRecoveryData(recoveryData as number[]);
    }
  }, [covidGraphData, covidGraphDataStatus]);

  const seriesData = [
    {
      name: "Cases",
      data: casesData as number[],
    },
    {
      name: "Deaths",
      data: deathData as number[],
    },
    {
      name: "Recovery",
      data: recoveryData as number[],
    },
  ];
  //
  const options = {
    chart: {
      // height: "100%",
      id: "zoomable-chart",
      toolbar: {
        tools: {
          zoom: true, // Enable zoom button
        },
      },
    },
    xaxis: {
      categories: dateCategory,
      label: {
        rotate: -45,
      },
    },
  };
  //
  return (
    <div className=" w-full h-[425px] p-2 rounded-md">
      {/* <p className="text-lg font-semibold text-center p-1 bg-[#d9d9d9] rounded-full">
        World Covid-19 Fluctuation Graph
      </p> */}
      {covidGraphDataStatus === AsyncState.PENDING && (
        <div className="w-full h-4/5 flex justify-center items-center">
          <Loader size="lg" />
        </div>
      )}
      {covidGraphDataStatus === AsyncState.FULFILLED && (
        <ReactApexChart
          options={options}
          series={seriesData}
          type="line"
          height={500}
        />
      )}
    </div>
  );
};
