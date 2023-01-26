import * as Location from "expo-location";
import { Bounds, LocationUseCase } from "_/domain/useCase/location";
import { Coords, Position } from "_/domain/useCase/position";
import { generateGeoHash, generateHashBounds } from "../../infra/helpers/locationHelpers";

export class LocationService implements LocationUseCase {
  async requestPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === Location.PermissionStatus.GRANTED;
  }

  async getCurrentPosition(): Promise<Position> {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return {
      location: {
        latitude,
        longitude,
      },
      geohash: generateGeoHash(latitude, longitude),
    };
  }

  generateGeoHashBounds(location: Coords, distanceInM: number): Bounds {
    const bounds = generateHashBounds(location, distanceInM);
    return bounds;
  }
}
