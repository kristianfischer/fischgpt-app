import { useQuery } from "@tanstack/react-query";
import { chat } from "../services/chat-service";
import { QUERY_KEY } from "@/constants/query-key";

export const useChat = (query: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.CHAT, query],
        queryFn: () => chat(query),
    });
};
