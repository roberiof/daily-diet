import { UserEntity } from "@/common/entities/User";
import { getFirestoreDoc } from "@/services/firestore";
import { useQuery } from "@tanstack/react-query";

export const getProfileQueryKey = (userId: string) => {
  return ["profile", userId];
};

export const getProfileQueryFn = (userId: string) => {
  return () =>
    getFirestoreDoc<UserEntity>(`users/${userId}`).then(
      (res) => res.data ?? undefined
    );
};

export const useProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: userId ? getProfileQueryKey(userId) : [],
    queryFn: userId ? getProfileQueryFn(userId) : undefined,
    staleTime: 1000 * 60 * 45, // 45 minutes
    enabled: !!userId
  });
};
