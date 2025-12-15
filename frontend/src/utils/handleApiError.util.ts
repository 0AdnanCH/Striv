import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

/**
 * Type Guard for RTK Query FetchBaseQueryError
 * Strictly checks for the presence of 'status' AND guarantees it's not an Axios error
 */
function isRTKFetchError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === 'object' && error !== null && 'status' in error && !('name' in error && error.name === 'AxiosError') // Defensively ensure it's not Axios
  );
}

/**
 * Type Guard for RTK SerializedError
 */
function isRTKSerializedError(error: unknown): error is SerializedError {
  return (
    typeof error === 'object' && error !== null && 'message' in error && !('status' in error) // Ensure it doesn't overlap with FetchBaseQueryError
  );
}

/**
 * Extraction Strategy:
 * Decouples the "how to get the string" from the "how to show it"
 */
function getErrorMessage(error: unknown): string | null {
  // 1️⃣ Axios Error (Class check is most specific)
  if (isAxiosError(error)) {
    // Backend returned a specific error response (e.g., 400 Bad Request)
    if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      return String((error.response.data as any).message);
    }
    // Network errors (e.g., timeout, DNS)
    return error.message;
  }

  // 2️⃣ RTK Query: FetchBaseQueryError
  if (isRTKFetchError(error)) {
    // Case: Server returned JSON with a message
    if ('data' in error && typeof error.data === 'object' && error.data !== null) {
      if ('message' in error.data) return String((error.data as any).message);
      if ('error' in error.data) return String((error.data as any).error);
    }
    // Case: Primitive error (like string)
    if ('error' in error) return String(error.error);

    return JSON.stringify(error.data); // Fallback for unhandled shapes
  }

  // 3️⃣ RTK Query: SerializedError
  if (isRTKSerializedError(error)) {
    return error.message || error.name || null;
  }

  // 4️⃣ Native JS Error
  if (error instanceof Error) {
    return error.message;
  }

  // 5️⃣ Fallback for strings/unknowns
  if (typeof error === 'string') return error;

  return null;
}

/**
 * Main Utility Function
 */
export function handleApiError(context: string, error: unknown, customMessage?: string): void {
  console.error(`[${context} API ERROR]`, error);

  // Extract the specific message using our strategy
  const specificMessage = getErrorMessage(error);

  // Decide the final message
  const finalMessage = specificMessage || customMessage || 'Something went wrong. Please try again.';

  toast.error(finalMessage);
}
