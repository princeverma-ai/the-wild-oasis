import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: updateSettingMutate } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("Settings Successfully Edited");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { isUpdating, updateSettingMutate };
}
