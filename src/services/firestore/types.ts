/* eslint-disable @typescript-eslint/no-explicit-any */
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type FirestoreQueryModifier =
  | {
      type: "where";
      fieldPath: string;
      opStr: FirebaseFirestoreTypes.WhereFilterOp;
      value: any;
    }
  | {
      type: "orderBy";
      fieldPath: string;
      directionStr?: "asc" | "desc";
    }
  | { type: "startAfter"; fieldPath: string; value: any }
  | { type: "limit"; number: number };
