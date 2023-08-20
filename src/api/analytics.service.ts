// Analytics service file

// import { useQuery } from "react-query";

// Getting all data
export const fetchCovidData = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/all");
  const data = await response.json();
  return data;
};

export const fetchCountryWiseData = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  const data = await response.json();
  return data;
};

export const fetchCovidGraphData = async () => {
  const response = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  const data = await response.json();
  return data;
};

//

// export const useCovidData = () => {
//   let data = useQuery("covidData", fetchCovidData);
//   return data;
// };
// export const useCountryWiseData = () => {
//   return useQuery("countryWiseData", fetchCovidData);
// };
// export const useCovidGraphData = () => {
//   return useQuery("covidGraphData", fetchCovidData);
// };
