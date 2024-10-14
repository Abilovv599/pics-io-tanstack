interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

export type { ApiError };
