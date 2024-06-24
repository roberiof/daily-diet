import firestore from "@react-native-firebase/firestore";
import { FirebaseError } from "firebase/app";
import { DocumentData } from "firebase/firestore";

type CollectionResponse<T> =
  | { data: (T & { id: string })[]; error: null }
  | { data: null; error: string };

export const getFirestoreCollection = async <T extends DocumentData>({
  collectionPath
}: {
  collectionPath: string;
}): Promise<CollectionResponse<T>> => {
  try {
    const querySnapshot = await firestore().collection(collectionPath).get();
    const finalData: (T & { id: string })[] = [];
    if (querySnapshot.empty) {
      return {
        data: [],
        error: null
      };
    }

    querySnapshot.forEach((item) => {
      const data = item.data() as T;

      finalData.push({ ...data, id: item.id });
    });

    return {
      data: finalData,
      error: null
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        error: error.message,
        data: null
      };
    } else {
      return {
        error: error as string,
        data: null
      };
    }
  }
};

// type DocumentResponse<T> =
//   | { data: (T & { id: string }) | null; error: null }
//   | { data: null; error: string };

// export const getFirestoreDoc = async <T extends DocumentData>({
//   documentPath
// }: {
//   documentPath: string;
// }): Promise<DocumentResponse<T>> => {
//   try {
//     const documentRef = doc(db, documentPath);
//     const docSnapshot = await getDoc(documentRef);

//     if (!docSnapshot.exists()) {
//       return {
//         data: null,
//         error: null
//       };
//     }

//     const data = docSnapshot.data() as T;

//     return {
//       data: { ...data, id: docSnapshot.id },
//       error: null
//     };
//   } catch (error) {
//     if (error instanceof FirebaseError) {
//       return {
//         error: error.message,
//         data: null
//       };
//     } else {
//       return {
//         error: error as string,
//         data: null
//       };
//     }
//   }
// };

// export const createFirestoreDoc = async <T extends DocumentData>({
//   collectionPath,
//   data
// }: {
//   collectionPath: string;
//   data: Omit<T, "id">;
// }): Promise<{ error: string | null }> => {
//   try {
//     const collectionRef = collection(db, collectionPath);
//     addDoc(collectionRef, data);

//     return {
//       error: null
//     };
//   } catch (error) {
//     if (error instanceof FirebaseError) {
//       return {
//         error: error.message
//       };
//     } else {
//       return {
//         error: "An unknown error occurred"
//       };
//     }
//   }
// };

// export const updateFirestoreDoc = async <T extends DocumentData>({
//   documentPath,
//   data
// }: {
//   documentPath: string;
//   data: Partial<Omit<T, "id">>;
// }): Promise<{ error: string | null }> => {
//   try {
//     const documentRef = doc(db, documentPath);

//     await updateDoc(documentRef, {
//       ...data
//     });

//     return {
//       error: null
//     };
//   } catch (error) {
//     if (error instanceof FirebaseError) {
//       return {
//         error: error.message
//       };
//     } else {
//       return {
//         error: "An unknown error occurred"
//       };
//     }
//   }
// };
