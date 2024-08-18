/* eslint-disable @typescript-eslint/no-explicit-any */
import firestore, {
  FirebaseFirestoreTypes
} from "@react-native-firebase/firestore";

class FirestoreService<T extends Record<string, any>> {
  private collectionRef: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

  constructor(collectionName: string) {
    this.collectionRef = firestore().collection(collectionName);
  }

  async createDoc(docId: string, data: T): Promise<void> {
    try {
      await this.collectionRef.doc(docId).set(data);
    } catch (error) {
      console.error("Error creating document: ", error);
      throw new Error("Error creating document");
    }
  }

  async updateDoc(docId: string, data: Partial<T>): Promise<void> {
    try {
      await this.collectionRef.doc(docId).update(data);
    } catch (error) {
      console.error("Error updating document: ", error);
      throw new Error("Error updating document");
    }
  }

  async deleteDoc(docId: string): Promise<void> {
    try {
      await this.collectionRef.doc(docId).delete();
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw new Error("Error deleting document");
    }
  }

  async getDoc(docId: string): Promise<T | null> {
    try {
      const doc = await this.collectionRef.doc(docId).get();
      if (doc.exists) {
        return doc.data() as T;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      throw new Error("Error getting document");
    }
  }

  async getAllDocs(): Promise<T[]> {
    try {
      const snapshot = await this.collectionRef.get();
      return snapshot.docs.map((doc) => doc.data() as T);
    } catch (error) {
      console.error("Error getting collection: ", error);
      throw new Error("Error getting collection");
    }
  }
}

export default FirestoreService;
