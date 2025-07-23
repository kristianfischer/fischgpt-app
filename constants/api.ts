const BASE_URL = process.env.NEXT_PUBLIC_FISCHGPT_BACKEND_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_FISCHGPT_BACKEND_URL is not set");
}

export const API = {
  BASE_URL,
} as const;
