import { Coords, Position } from "_/domain/useCase/position";

export interface LocationUseCase {
  requestPermission: () => Promise<boolean>;
  getCurrentPosition: () => Promise<Position>;
  generateGeoHashBounds: (location: Coords, distanceInM: number) => Bounds;
}

export type GeopHash = string;
export type GeoHashRange = [GeopHash, GeopHash];
export type Bounds = GeoHashRange[];
