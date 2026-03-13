import type { ApiResponse } from "@/data/api/arrival-api";
import { isAxiosError, type AxiosError } from "axios";

export interface ApiError {
  type: 'API_ERROR' | 'NETWORK_ERROR' | 'CONFIG'
  status?: string
  summary: string
  details: string
}

export function apiErrorHandler<T>(error: Error | AxiosError<ApiError>): ApiResponse<T> {

  if (isAxiosError(error)) {
    //AxiosError
    if (error.response) {
      //status code > 2xx
      return {
        success: false,
        error: error.response.data
      }
    } else if (error.request) {
      //no response
      return {
        success: false,
        error: {
          type: 'NETWORK_ERROR',
          summary: 'No response from server. Check connection',
          details: error.request
        }
      }
    } else {
      //config setup error
      return {
        success: false,
        error: {
          type: 'CONFIG',
          summary: 'Client configuration error.',
          details: error.message
        }
      }
    }
  }

  return {
    success: false,
    error: error
  }
}