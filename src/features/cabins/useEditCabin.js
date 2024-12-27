import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();
    const { isLoading: isEditing, mutate: editCabinMutate } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin Successfully Edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { isEditing, editCabinMutate };
}
