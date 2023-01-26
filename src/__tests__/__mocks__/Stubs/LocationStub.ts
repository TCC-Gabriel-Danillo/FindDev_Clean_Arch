import { GeoHashRange, GeopHash, LocationUseCase } from "_/domain/useCase/location";
import { Position, Coords } from "_/domain/useCase/position";

export const mockPosition = {
  geohash: "bhdsa2",
  location: {
    latitude: 100,
    longitude: 100,
  },
} as Position;

export class LocationServiceStub implements LocationUseCase {
  requestPermission = jest.fn(() => {
    return Promise.resolve(true);
  });

  getCurrentPosition = jest.fn(() => {
    return Promise.resolve(mockPosition);
  });

  generateGeoHashBounds = jest.fn((location: Coords, distanceInM: number) => {
    const firstSlice = "bhd" as GeopHash;
    const secondSlice = "sa2" as GeopHash;
    const geohash = [firstSlice, secondSlice] as GeoHashRange;
    return [geohash];
  });
}
