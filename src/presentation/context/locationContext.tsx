import React, { createContext, useState, useEffect } from "react";
import { LocationUseCase } from "_/domain/useCase/location";
import { Position } from "_/domain/useCase/position";

interface ILocationContext {
  getPositionAsync: () => Promise<Position | undefined>;
  position: Position;
}

export const LocationContext = createContext<ILocationContext>({} as ILocationContext);

interface Props {
  children: JSX.Element;
  locationService: LocationUseCase;
}

export function LocationContextProvider({ children, locationService }: Props) {
  const [position, setPosistion] = useState<Position>({} as Position);

  const getPositionAsync = async () => {
    const grantedPermission = await locationService.requestPermission();
    if (grantedPermission) {
      return await locationService.getCurrentPosition();
    }
  };

  useEffect(() => {
    (async () => {
      const position = await getPositionAsync();
      if (position?.location.latitude && position?.location.longitude) setPosistion(position);
    })();
  }, []);

  return <LocationContext.Provider value={{ getPositionAsync, position }}>{children}</LocationContext.Provider>;
}
