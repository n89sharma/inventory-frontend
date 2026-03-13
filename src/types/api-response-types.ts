import type { ApiError } from "@/lib/error-handler";

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError | Error }