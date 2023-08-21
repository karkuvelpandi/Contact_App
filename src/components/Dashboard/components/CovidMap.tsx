import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { RootState } from "../../../redux";
import { useSelector } from "react-redux";
import { Loader } from "../../../ui/Loader/Loader";
import { AsyncState } from "../../../types";
import { DivIcon, Icon, divIcon, point } from "leaflet";
import MarkerIcon from "../../../ui/images/location.png";
import { transformMarkerData } from "../../../utils/general.util";
import { MarkerData } from "../../../types/dashboard";

export const CovidMap = () => {
  const countryWiseData = useSelector(
    (state: RootState) => state.analytics.countryWiseData
  );
  const countryWiseDataStatus = useSelector(
    (state: RootState) => state.analytics.countryWiseDataStatus
  );
  // Creating custom icon from leaflet
  const customIcon = new Icon({
    iconUrl: MarkerIcon,
    iconSize: [38, 38],
  });

  // markers
  const dataMarker = transformMarkerData(countryWiseData);
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1",
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Hello, I am pop up 2",
    },
    {
      geocode: [48.855, 2.34],
      popUp: "Hello, I am pop up 3",
    },
  ];

  return (
    <div className=" w-full h-[425px] p-2 pb-5 border-2 rounded-md space-y-3">
      <p className="text-lg font-semibold text-center p-1 bg-[#d9d9d9] rounded-full">
        World Covid-19 Map - Country Wise
      </p>
      {countryWiseDataStatus === AsyncState.PENDING && (
        <div className="w-full h-4/5 flex justify-center items-center">
          <Loader size="lg" />
        </div>
      )}
      {countryWiseDataStatus === AsyncState.FULFILLED && (
        <MapContainer center={[20.5937, 78.9629]} zoom={5}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {dataMarker.map((marker: MarkerData, index: number) => (
            <Marker
              key={index}
              icon={customIcon}
              position={[marker.geoCode[0], marker.geoCode[1]]}
            >
              <Popup>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10px",
                    marginRight: "10px",
                    gap: "15px",
                    padding: "5px",
                  }}
                >
                  <img
                    src={marker.popUp.flagUrl}
                    height="60px"
                    width="60px"
                    alt=""
                    style={{ borderRadius: "5px", marginBottom: "5px" }}
                  />
                  <div style={{ width: "200px", height: "70px" }}>
                    <h1 style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {marker.popUp.country.length > 16
                        ? marker.popUp.country.slice(0, 16)
                        : marker.popUp.country}
                    </h1>
                    <h3 style={{ fontWeight: "bold" }}>
                      Active Cases:{" "}
                      <span style={{ color: "blue" }}>
                        {marker.popUp.active}
                      </span>
                    </h3>
                    <h3 style={{ fontWeight: "bold" }}>
                      Recovered:{" "}
                      <span style={{ color: "green" }}>
                        {marker.popUp.recovered}
                      </span>
                    </h3>
                    <h3 style={{ fontWeight: "bold" }}>
                      Deaths:{" "}
                      <span style={{ color: "red" }}>
                        {marker.popUp.deaths}
                      </span>
                    </h3>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};
