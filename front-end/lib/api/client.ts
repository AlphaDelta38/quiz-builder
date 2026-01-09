"use client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type RequestOptions = RequestInit & {
  skipAuthHeader?: boolean;
  skipRefresh?: boolean;
};

type RequestError = Error & { status?: number };

let refreshPromise: Promise<void> | null = null;

async function refreshToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("Refresh failed") as RequestError;
          error.status = res.status;
          throw error;
        }
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function request<TResponse>(
  path: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const { skipAuthHeader, skipRefresh, headers, ...rest } = options;

  const doFetch = async (): Promise<Response> => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(headers as Record<string, string>),
      },
      ...rest,
    });
    return res;
  };

  const handleResponse = async (response: Response): Promise<TResponse> => {
    if (response.ok) {
      if (response.status === 204) return undefined as TResponse;
      return (await response.json()) as TResponse;
    }

    const errorBody = await response.json().catch(() => ({}));
    const message =
      errorBody?.message ||
      errorBody?.error ||
      response.statusText ||
      "Request failed";

    const error = new Error(message) as RequestError;
    error.status = response.status;
    throw error;
  };

  try {
    const response = await doFetch();

    if (response.status === 401 && !skipRefresh) {
      try {
        await refreshToken();
        const retryResponse = await doFetch();
        return await handleResponse(retryResponse);
      } catch (refreshError) {
        const err = refreshError as RequestError;
        if (err.status === 401) {
          throw err;
        }
      }
    }

    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
}

export { API_BASE_URL };

