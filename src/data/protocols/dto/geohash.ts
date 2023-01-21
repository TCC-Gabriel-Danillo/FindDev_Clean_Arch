import { Coords, Position } from "_/domain/useCase/position";

export interface LocationInfraType {
  requestPermission: () => Promise<boolean>;
  getCurrentPosition: () => Promise<Position>;
  generateGeoHashBounds: (location: Coords, distanceInM: number) => Bounds;
}

type GeopHash = string;
type GeoHashRange = [GeopHash, GeopHash];
export type Bounds = GeoHashRange[];
