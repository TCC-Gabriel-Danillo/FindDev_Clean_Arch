import { Coords } from "_/domain/useCase/position";
import { User, UserUseCase } from "_/domain/useCase/users";
import { DatabaseType } from "../protocols/database/database";
import { QueryOptions } from "../protocols/database/options";
import { FirebaseUser, mapFirebaseUserToUser, mapUserToFirebaseUser } from "../protocols/dto/firebase";
import _ from "lodash";
import { AuthResponse } from "_/domain/useCase/auth";
import { LocationUseCase } from "_/domain/useCase/location";

export class UsersService implements UserUseCase {
  constructor(private readonly locationService: LocationUseCase, private readonly userDatabase: DatabaseType) {}

  async listUsersByDistance(location: Coords, distanceInM: number): Promise<User[]> {
    const bounds = this.locationService.generateGeoHashBounds(location, distanceInM);
    const promisses = [];

    for (let bound of bounds) {
      const [boundStart, boundEnd] = bound;
      const args: QueryOptions = {
        orderArgs: {
          field: "position.geohash",
          startAt: boundStart,
          entAt: boundEnd,
        },
      };
      promisses.push(this.userDatabase.getAll<FirebaseUser>(args));
    }
    const fUsers = _.flatMapDeep(await Promise.all(promisses));
    return fUsers.map((fUser: FirebaseUser) => mapFirebaseUserToUser(fUser));
  }

  async createAndUpdateUser(user: AuthResponse) {
    const position = await this.getUserPosition();
    const _user = { ...user, position };
    const fUser = mapUserToFirebaseUser(_user);
    await this.userDatabase.createOrReplace(fUser, fUser.id);
    return _user;
  }

  private async getUserPosition() {
    const isPermisstionGranted = await this.locationService.requestPermission();
    if (!isPermisstionGranted) throw new Error("Permission not granted.");
    const position = await this.locationService.getCurrentPosition();
    return position;
  }
}
