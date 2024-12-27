import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBookingMutate } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success("Booking Deleted Succesfully");
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {
        isDeleting,
        deleteBookingMutate,
    };
}
