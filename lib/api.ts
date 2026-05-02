import { headers } from 'next/headers';

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly path: string,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

function resolveBaseUrl(host: string, forwardedProto: string | null): string {
  const protocol = forwardedProto ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${protocol}://${host}`;
}

export async function requestApi<T>(path: string, init?: RequestInit): Promise<T> {
  const requestHeaders = await headers();
  const forwardedProto = requestHeaders.get('x-forwarded-proto');
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');

  if (!host) {
    throw new Error('无法确定当前请求主机，无法发起接口请求');
  }

  const response = await fetch(`${resolveBaseUrl(host, forwardedProto)}${path}`, {
    cache: 'no-store',
    ...init,
  });

  if (!response.ok) {
    throw new ApiRequestError(`请求 ${path} 失败`, response.status, path);
  }

  return response.json() as Promise<T>;
}
