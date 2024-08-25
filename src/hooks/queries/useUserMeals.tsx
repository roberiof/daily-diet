import { MealEntity } from "@/common/entities/Meal";
import { getAllFirestoreDocs } from "@/services/firestore";
import { FirestoreQueryModifier } from "@/services/firestore/types";
import { useQuery } from "@tanstack/react-query";

export const getProfileQueryKey = (
  userId: string,
  afterDate?: Date,
  limitNumber?: number
) => {
  return ["meals", userId, afterDate, limitNumber];
};

export const getProfileQueryFn = (
  userId: string,
  afterDate?: Date,
  limitNumber?: number
) => {
  const modifiers: FirestoreQueryModifier[] = [
    {
      type: "where",
      fieldPath: "userId",
      opStr: "==",
      value: userId
    }
  ];

  if (afterDate) {
    modifiers.push({
      type: "orderBy",
      fieldPath: "date"
    });

    modifiers.push({
      type: "startAfter",
      fieldPath: "date",
      value: afterDate
    });
  }

  if (limitNumber) {
    modifiers.push({
      type: "limit",
      number: limitNumber
    });
  }

  return () => getAllFirestoreDocs<MealEntity>(`meals`, modifiers);
};

export const useUserMeals = ({
  userId,
  afterDate,
  limitNumber
}: {
  userId: string | undefined;
  afterDate?: Date;
  limitNumber?: number;
}) => {
  return useQuery({
    queryKey: userId ? getProfileQueryKey(userId, afterDate, limitNumber) : [],
    queryFn: userId
      ? getProfileQueryFn(userId, afterDate, limitNumber)
      : undefined,
    staleTime: 1000 * 60 * 45, // 45 minutes
    enabled: !!userId
  });
};
