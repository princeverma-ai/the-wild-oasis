import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    //Filter
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    //Sort by
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    //Pagination
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    //Query
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["Bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    const pageCount = Math.ceil(count / PAGE_SIZE);

    //Prefetching
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["Bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["Bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }

    return { isLoading, error, bookings, count };
}
