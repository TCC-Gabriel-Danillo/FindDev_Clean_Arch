import { getFirestore, setDoc, doc, Firestore, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { DatabaseType } from "_/data/protocols/database/database";
import { QueryOptions } from "_/data/protocols/database/options";
import { getRefFromArgs, parseCollection, parseFirebaseSnapshot } from "../helpers/databaseHelpers";

export class Database implements DatabaseType {
  private readonly firestore: Firestore = getFirestore();
  private readonly collections: string[];

  constructor(...collections: string[]) {
    this.collections = collections;
  }

  async createOrReplace(data: any, id?: string) {
    await setDoc(doc(this.collection, id), data);
  }

  async getOneById<T>(id: string): Promise<T> {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as T;
  }

  async getAll<T>(args?: QueryOptions): Promise<T[]> {
    const docsRef = getRefFromArgs(this.collection, args);
    const docsSnap = await getDocs(docsRef);
    return parseFirebaseSnapshot<T>(docsSnap);
  }

  async update(data: any, id: string): Promise<void> {
    await updateDoc(doc(this.collection, id), data);
  }

  async delete(id: string) {
    await deleteDoc(doc(this.collection, id));
  }

  private get collection() {
    return parseCollection(this.collections, this.firestore);
  }
}
