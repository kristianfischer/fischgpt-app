import { apiClient } from './../api-client';
import { chatDtoSchema } from "@/lib/schemas/chat-dto-schema";
import { API } from "@/constants/api";

export async function chat(query: string) {
    const response = await apiClient.post(API.CHAT, {
        "query": query,
    });

    return chatDtoSchema.parse(response);
}