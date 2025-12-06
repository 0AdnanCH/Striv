import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function handleApiError(context: string, error: unknown, customMessage?: string): void {
  let message = customMessage || 'Something went wrong. Please try again.';

  console.error(`[${context} API ERROR]`, error);

  const isRTKFetchError = (error: any): error is FetchBaseQueryError => error && typeof error === 'object' && ('status' in error || 'error' in error);

  const isRTKSerializedError = (err: any): err is SerializedError => err && typeof err === 'object' && ('message' in err || 'name' in err);

  // 1️⃣ RTK Query: FetchBaseQueryError
  if (isRTKFetchError(error)) {
    // Case: RTK Query returns structured error
    if ('data' in error && (error.data as any)?.message) {
      message = (error.data as any).message;
    } else if ('error' in error && typeof error.error === 'string') {
      message = error.error; // Network errors
    }

    // 2️⃣ RTK Query: SerializedError
  } else if (isRTKSerializedError(error)) {
    if (error.message) {
      message = error.message;
    } else if (error.name) {
      message = error.name;
    }

    // 3️⃣ Axios Error
  } else if (error instanceof AxiosError) {
    // Case 1: Backend responded with an error (4xx / 5xx)
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      // Case 2: Network or CORS error
      message = error.message;
    }

    // 4️⃣ Default JS Error
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
}