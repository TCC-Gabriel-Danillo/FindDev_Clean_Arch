import { geohashForLocation, geohashQueryBounds, Geopoint } from "geofire-common";
import { Coords } from "_/domain/useCase/position";

export const generateGeoHash = (latitude: number, longitude: number) => {
  return geohashForLocation([latitude, longitude]);
};

export const generateHashBounds = (location: Coords, radiusInM: number) => {
  const center = [location.latitude, location.longitude] as Geopoint;
  return geohashQueryBounds(center, radiusInM);
};
