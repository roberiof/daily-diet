import { UserEntity } from "@/common/entities/User";
import { getFirestoreDoc } from "@/services/firestore";
import { useQuery } from "@tanstack/react-query";

export const getProfileQueryKey = (userId: string | undefined) => {
  return ["profile", userId];
};

export const getProfileQueryFn = (userId: string | undefined) => {
  return () =>
    getFirestoreDoc<UserEntity>(`users/${userId}`)
      .then((doc) => doc.data)
      .catch(() => null);
};

export const useProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: getProfileQueryKey(userId),
    queryFn: getProfileQueryFn(userId),
    staleTime: 1000 * 60 * 45, // 45 minutes
    enabled: !!userId
  });
};
