/* eslint-disable @typescript-eslint/no-explicit-any */
import firestore, {
  FirebaseFirestoreTypes
} from "@react-native-firebase/firestore";

import { FirestoreQueryModifier } from "./types";

export const setFirestoreDoc = async <T extends Record<string, any>>(
  documentRef: string,
  data: T
) => {
  try {
    await firestore().doc(documentRef).set(data);
    return { error: null };
  } catch (error) {
    console.error("Error creating document: ", error);
    return { error: "Error creating document" };
  }
};

export const addFirestoreDoc = async <T extends Record<string, any>>(
  collectionRef: string,
  data: Omit<T, "id">
) => {
  try {
    await firestore().collection(collectionRef).add(data);
  } catch (error) {
    console.error("Error creating document: ", error);
    throw new Error("Error creating document");
  }
};

export const updateFirestoreDoc = async <T extends Record<string, any>>(
  documentRef: string,
  data: Partial<T>
) => {
  try {
    await firestore().doc(documentRef).update(data);
    return { error: null };
  } catch (error) {
    console.error("Error updating document: ", error);
    return { error: "Error updating document" };
  }
};

export const deleteFirestoreDoc = async (documentRef: string) => {
  try {
    await firestore().doc(documentRef).delete();
    return { error: null };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { error: "Error deleting document" };
  }
};

export const getFirestoreDoc = async <T>(
  documentRef: string
): Promise<{ data: T; error: null } | { data: null; error: string }> => {
  try {
    const doc = await firestore().doc(documentRef).get();
    if (doc.exists) {
      return { data: { id: doc.id, ...doc.data() } as T, error: null };
    } else {
      return { data: null, error: "No such document" };
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return { data: null, error: "Error getting document" };
  }
};

export const getAllFirestoreDocs = async <T>(
  collectionRef: string,
  modifiers: FirestoreQueryModifier[] = []
) => {
  try {
    let query: FirebaseFirestoreTypes.Query =
      firestore().collection(collectionRef);

    modifiers.forEach((modifier) => {
      switch (modifier.type) {
        case "where":
          query = query.where(
            modifier.fieldPath,
            modifier.opStr,
            modifier.value
          );
          break;
        case "orderBy":
          query = query.orderBy(modifier.fieldPath, modifier.directionStr);
          break;
        case "startAfter":
          query = query.startAfter(modifier.value);
          break;
        case "limit":
          query = query.limit(modifier.number);
          break;
      }
    });

    const snapshot = await query.get();
    const data = snapshot.docs.map((doc) => doc.data() as T);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Some error occurred: ${error.message}`);
    } else {
      throw new Error(
        "Failed to retrieve documents from Firestore: An unknown error occurred"
      );
    }
  }
};
