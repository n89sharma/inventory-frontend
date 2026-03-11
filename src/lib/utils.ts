import type { ApiResponse } from "@/data/api/arrival-api";
import { isAxiosError, type AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ApiError {
  type: 'API_ERROR' | 'NETWORK_ERROR' | 'CONFIG'
  status?: string
  summary: string
  details: string
}

export function apiErrorHandler(error: Error | AxiosError<ApiError>): ApiResponse {

  if (isAxiosError(error)) {
    //AxiosError
    if (error.response) {
      //status code > 2xx
      return {
        isSuccessful: false,
        error: error.response.data
      }
    } else if (error.request) {
      //no response
      return {
        isSuccessful: false,
        error: {
          type: 'NETWORK_ERROR',
          summary: 'No response from server. Check connection',
          details: error.request
        }
      }
    } else {
      //config setup error
      return {
        isSuccessful: false,
        error: {
          type: 'CONFIG',
          summary: 'Client configuration error.',
          details: error.message
        }
      }
    }
  }

  return {
    isSuccessful: false,
    error: error
  }
}