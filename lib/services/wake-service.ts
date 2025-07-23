import { apiClient } from './../api-client';
import { API } from "@/constants/api";
import { wakeDtoSchema } from "@/lib/schemas/wake-dto-schema";

export async function wake() {
    const response = await apiClient.post(API.WAKE);
    return wakeDtoSchema.parse(response);
}
