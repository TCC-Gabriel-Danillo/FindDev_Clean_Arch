export type Coords = {
  latitude: number;
  longitude: number;
};

export type Position = {
  location: Coords;
  geohash: string;
};
