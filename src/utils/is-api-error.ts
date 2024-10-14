import { ApiError } from '@/models/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isApiError = (error: any): error is { error: ApiError } => {
  return error && error.error && typeof error.error.status === 'number';
};

export { isApiError };
