import { MealEntity } from "@/common/entities/Meal";
import { getAllFirestoreDocs } from "@/services/firestore";
import { FirestoreQueryModifier } from "@/services/firestore/types";
import { useQuery } from "@tanstack/react-query";

export const getUserMealsQueryKey = (
  userId: string,
  afterDate?: Date,
  limitNumber?: number
) => {
  const base: string[] = ["meals", userId];
  if (limitNumber) {
    base.push(limitNumber.toString());
  }
  if (afterDate) {
    base.push(afterDate.toLocaleDateString());
  }
  return base;
};

export const getUserMealsQueryFn = (
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
    },
    {
      type: "orderBy",
      fieldPath: "date",
      directionStr: "desc"
    }
  ];

  if (afterDate) {
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
  userId: string;
  afterDate?: Date;
  limitNumber?: number;
}) => {
  return useQuery({
    queryKey: getUserMealsQueryKey(userId, afterDate, limitNumber),
    queryFn: getUserMealsQueryFn(userId, afterDate, limitNumber),
    staleTime: 1000 * 60 * 45 // 45 minutes
  });
};
