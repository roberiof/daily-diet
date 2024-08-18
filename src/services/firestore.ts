/* eslint-disable @typescript-eslint/no-explicit-any */
import firestore from "@react-native-firebase/firestore";

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
  data: T
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

export const getFirestoreDoc = async <T extends Record<string, any>>(
  documentRef: string
): Promise<{ data: T; error: null } | { data: null; error: string }> => {
  try {
    const doc = await firestore().doc(documentRef).get();
    if (doc.exists) {
      return { data: doc.data() as T, error: null };
    } else {
      return { data: null, error: "No such document" };
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return { data: null, error: "Error getting document" };
  }
};

export const getAllFirestoreDocs = async <T extends Record<string, any>>(
  collectionRef: string
): Promise<{ data: T[]; error: string | null }> => {
  try {
    const snapshot = await firestore().collection(collectionRef).get();
    const data = snapshot.docs.map((doc) => doc.data() as T);
    return { data, error: null };
  } catch (error) {
    console.error("Error getting collection: ", error);
    return { data: [], error: "Error getting collection" };
  }
};
