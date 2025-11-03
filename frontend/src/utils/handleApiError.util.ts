import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function handleApiError(context: string, error: unknown, customMessage?: string): void {
  let message = customMessage || 'Something went wrong. Please try again.';

  if (error instanceof AxiosError) {
    // Case 1: Backend responded with an error (4xx / 5xx)
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      // Case 2: Network or CORS error
      message = error.message;
    }
  } else if (error instanceof Error) {
    // Case 3: JS error (like a bug)
    message = error.message;
  }

  console.error(`[${context} API ERROR]`, error);
  toast.error(message);
}