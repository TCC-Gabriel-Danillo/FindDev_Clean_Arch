import * as Location from "expo-location";
import { Bounds, LocationInfraType } from "_/data/protocols/dto/geohash";
import { Coords, Position } from "_/domain/useCase/position";
import { generateGeoHash, generateHashBounds } from "../helpers/locationHelpers";

export class Geohash implements LocationInfraType {
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
