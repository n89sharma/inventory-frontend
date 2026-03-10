import { isAxiosError, type AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ApiErrorResponse {
  message: string
  errorCode?: string
  details?: string[]
}

export function axiosErrorHandler(error: Error | AxiosError<ApiErrorResponse>) {
  // 2. Use the Type Guard provided by Axios
  if (isAxiosError(error)) {
    // Now 'error' is typed as AxiosError inside this block
    if (error.response) {
      // The server responded with a status code > 2xx
      // Accessing data is now type-safe
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // Request was made but no response (Network error/Timeout)
      console.log(error.request);
    } else {
      // Configuration setup error
      console.log('Setup Error', error.message);
    }
    console.log(error.config);
  } else {
    // 3. Handle non-Axios errors (e.g., a crash inside a .then block)
    console.error('An unexpected error occurred:', error.message);
  }
}