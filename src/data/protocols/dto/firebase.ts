import { Coords } from "_/domain/useCase/position";
import { User } from "_/domain/useCase/users";

export interface FirebaseUser extends Omit<User, "position"> {
  position: Coords & { geohash: string };
}

export const mapFirebaseUserToUser = (fUser: FirebaseUser): User => {
  return {
    email: fUser.email,
    id: fUser.id,
    username: fUser.username,
    photoUrl: fUser.photoUrl,
    techs: fUser.techs,
    position: {
      location: {
        latitude: fUser.position.latitude,
        longitude: fUser.position.longitude,
      },
      geohash: fUser.position.geohash,
    },
    profileUrl: fUser.profileUrl,
  };
};

export const mapUserToFirebaseUser = (user: User): FirebaseUser => {
  return {
    email: user.email,
    id: user.id,
    username: user.username,
    photoUrl: user.photoUrl,
    techs: user.techs,
    position: {
      latitude: user.position.location.latitude,
      longitude: user.position.location.longitude,
      geohash: user.position.geohash,
    },
    profileUrl: user.profileUrl,
  };
};
