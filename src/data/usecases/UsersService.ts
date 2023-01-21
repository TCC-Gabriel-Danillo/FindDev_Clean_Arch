import { Coords } from "_/domain/useCase/position";
import { User } from "_/domain/useCase/users";
import { DatabaseType } from "../protocols/database/database";
import { QueryOptions } from "../protocols/database/options";
import { FirebaseUser, mapFirebaseUserToUser, mapUserToFirebaseUser } from "../protocols/dto/firebase";
import { LocationInfraType } from "../protocols/dto/geohash";
import _ from "lodash";

export class UsersService {
  constructor(private readonly geohash: LocationInfraType, private readonly userDatabase: DatabaseType) {}

  async listUsersByDistance(location: Coords, distanceInM: number): Promise<User[]> {
    const bounds = this.geohash.generateGeoHashBounds(location, distanceInM);
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

  async getUserPosition() {
    const isPermisstionGranted = await this.geohash.requestPermission();
    if (!isPermisstionGranted) throw new Error("Permission not granted.");
    const position = await this.geohash.getCurrentPosition();
    return position;
  }

  async createUser(user: User) {
    const fUser = mapUserToFirebaseUser(user);
    await this.userDatabase.createOrReplace(fUser, fUser.id);
  }

  async updateUser(user: User) {
    const fUser = mapUserToFirebaseUser(user);
    await this.userDatabase.update(fUser, fUser.id);
  }
}