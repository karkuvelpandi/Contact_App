import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { AsyncState } from "../../../types";
import { DashboardCard } from "./DashboardCard";
import { Loader } from "../../../ui/Loader/Loader";
import world from "../../../ui/svgs/covid/world.svg";
import doctor from "../../../ui/svgs/covid/doctor.svg";
import dangerImg from "../../../ui/svgs/covid/danger1.svg";
import total from "../../../ui/svgs/covid/total-cases.svg";
import affected from "../../../ui/svgs/covid/affectedMan.svg";
import recovered2 from "../../../ui/svgs/covid/recovered2.svg";
import affected2 from "../../../ui/svgs/covid/affectedMan2.svg";
import thermometer from "../../../ui/svgs/covid/thermameter.svg";

// Component to render overall covid dash board
export const CovidDashboard = () => {
  const worldCovidData = useSelector(
    (state: RootState) => state.analytics.worldCovidData
  );
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );
  const worldCovidDataStatus = useSelector(
    (state: RootState) => state.analytics.worldCovidDataStatus
  );

  return (
    <div className=" w-full min-h-[425px] p-2 border-2 rounded-md ">
      <p className="text-lg font-semibold text-center p-1 bg-[#d9d9d9] rounded-full">
        World Covid-19 Overall - Dashboard
      </p>
      {worldCovidDataStatus === AsyncState.PENDING && (
        <div className="w-full absolute top-36 flex justify-center items-center">
          <Loader size="lg" />
        </div>
      )}
      {worldCovidDataStatus === AsyncState.FULFILLED && (
        <div className="p-2 flex gap-3 flex-wrap mt-3">
          <DashboardCard
            title="Today New Cases"
            svgIconSize={isMobileView ? "md" : "lg"}
            dataCount={worldCovidData.todayCases}
            bgColor="blue"
            svgIcon={affected}
            textColor="white"
            updatedAt={worldCovidData.updated}
            excessPoint={`Today Death Cases ${worldCovidData.todayDeaths}`}
          />
          <DashboardCard
            title="All Time Cases"
            svgIconSize={isMobileView ? "md" : "lg"}
            dataCount={worldCovidData.cases}
            bgColor="yellow"
            svgIcon={total}
            excessPoint={
              Math.floor(
                (worldCovidData.cases / worldCovidData.population) * 100
              ) + "% of world's population"
            }
            updatedAt={worldCovidData.updated}
          />
          <DashboardCard
            title="All Time Deaths"
            svgIconSize={isMobileView ? "md" : "lg"}
            dataCount={worldCovidData.deaths}
            bgColor="orange"
            textColor="white"
            svgIcon={dangerImg}
            updatedAt={worldCovidData.updated}
          />
          <DashboardCard
            title="All Time Recovered"
            svgIconSize={isMobileView ? "md" : "lg"}
            dataCount={worldCovidData.recovered}
            bgColor="green"
            textColor="white"
            svgIcon={recovered2}
            updatedAt={worldCovidData.updated}
            excessPoint={"Today Recovered - " + worldCovidData.todayRecovered}
          />
          <DashboardCard
            title="Critical Condition"
            svgIconSize={isMobileView ? "md" : "lg"}
            dataCount={worldCovidData.critical}
            bgColor="aqua"
            svgIcon={doctor}
            updatedAt={worldCovidData.updated}
          />
          <DashboardCard
            title="All Time Covid Test"
            svgIconSize={isMobileView ? "md" : "lg"}
            dataCount={worldCovidData.tests}
            bgColor="pink"
            svgIcon={thermometer}
            updatedAt={worldCovidData.updated}
          />
          <DashboardCard
            title="Active Cases"
            svgIconSize={isMobileView ? "md" : "lg"}
            dataCount={worldCovidData.active}
            bgColor="gray"
            svgIcon={affected2}
            updatedAt={worldCovidData.updated}
          />
          <DashboardCard
            title="Affected Countries"
            svgIconSize={isMobileView ? "md" : "lg"}
            dataCount={worldCovidData.affectedCountries}
            bgColor="brown"
            textColor="white"
            svgIcon={world}
            updatedAt={worldCovidData.updated}
          />
        </div>
      )}
    </div>
  );
};
