// Dashboard type file

export interface PopupData {
  flagUrl: string;
  country: string;
  active: number;
  recovered: number;
  deaths: number;
}

export interface MarkerData {
  geoCode: [number, number];
  popUp: PopupData;
}
