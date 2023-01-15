import { ORDER, QueryOptions } from "_/data/protocols/database/options";
import {
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
  orderBy,
  query,
  Query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

export const parseFirebaseSnapshot = <T>(snap: QuerySnapshot<DocumentData>): T[] => {
  return snap.docs.map((d) => ({ ...d.data(), id: d.id })) as T[];
};

export const parseCollection = (collections: string[], firestore: Firestore): CollectionReference<DocumentData> => {
  if (collection.length > 1) {
    return collection.apply(null, [firestore, ...collections]);
  }
  return collection(firestore, collections[0]);
};

export const getRefFromArgs = (
  collection: CollectionReference<DocumentData>,
  options?: QueryOptions
): Query<DocumentData> => {
  if (options?.filterArgs && options?.orderArgs) {
    const { field: filterField, op, value } = options.filterArgs;
    const { field: orderField, order } = options.orderArgs;
    return query(collection, where(filterField, op, value), orderBy(orderField, order || ORDER.ASC));
  }

  if (options?.filterArgs) {
    const { field: filterField, op, value } = options.filterArgs;
    return query(collection, where(filterField, op, value));
  }

  if (options?.orderArgs) {
    const { field: orderField, order } = options.orderArgs;
    return query(collection, orderBy(orderField, order));
  }

  return query(collection);
};
