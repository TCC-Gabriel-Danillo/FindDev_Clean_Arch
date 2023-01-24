import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { Coords, Position } from "_/domain/useCase/position";

interface ILocationContext {
  getPositionAsync: () => Promise<Coords>;
  position: Coords;
}

export const LocationContext = createContext<ILocationContext>({} as ILocationContext);

interface Props {
  children: JSX.Element;
}
export function LocationContextProvider({ children }: Props) {
  const [position, setPosistion] = useState<Coords>({} as Coords);

  const getPositionAsync = async (): Promise<Coords> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted")
      return {
        latitude: 0,
        longitude: 0,
      };

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  useEffect(() => {
    (async () => {
      const position = await getPositionAsync();
      if (position.latitude && position.latitude) setPosistion(position);
    })();
  }, []);

  return <LocationContext.Provider value={{ getPositionAsync, position }}>{children}</LocationContext.Provider>;
}
