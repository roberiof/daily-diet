import { TouchableOpacity } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter
} from "../../../lib/components/ui/alert-dialog";
import { Text } from "../Text/text";
import { deleteFirestoreDoc } from "@/services/firestore";
import { getUserMealsQueryKey } from "@/hooks/queries/useUserMeals";
import { useAuthenticated } from "../../../../templates/Authenticated/provider/AuthenticatedContext";
import { DeleteMealModalProps } from "./types";

export default function DeleteMealModal({
  mealId,
  isOpen,
  onClose
}: DeleteMealModalProps) {
  const { user } = useAuthenticated();
  const queryClient = useQueryClient();
  const onDelete = async () => {
    await deleteFirestoreDoc(`meals/${mealId}`);
    queryClient.invalidateQueries({ queryKey: getUserMealsQueryKey(user.id) });
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="xs">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text className="text-typography-950 font-semibold">
            Are you sure you want to delete this meal?
          </Text>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <TouchableOpacity
            className="bg-base-gray-700 py-4 px-6 w-full rounded-[6px] text-center border-1 border-transparent disabled:opacity-30 flex items-center justify-center flex-row space-x-4"
            onPress={onClose}
          >
            <Text className="text-white  font-medium">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border-base-gray-700 border bg-transparent py-4 px-6 w-full rounded-[6px] text-center disabled:opacity-30 flex items-center justify-center flex-row space-x-4"
            onPress={onDelete}
          >
            <Text className="text-base-gray-700 font-medium">Delete</Text>
          </TouchableOpacity>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
