import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCabinMutate } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success("Cabin Deleted Succesfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {
        isDeleting,
        deleteCabinMutate,
    };
}
