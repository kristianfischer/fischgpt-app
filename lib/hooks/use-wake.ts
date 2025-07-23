import { useQuery } from "@tanstack/react-query";
import { wake } from "../services/wake-service";
import { QUERY_KEY } from "@/constants/query-key";

export const useWake = () => {
    return useQuery({
        queryKey: [QUERY_KEY.WAKE],
        queryFn: () => wake(),
    });
};