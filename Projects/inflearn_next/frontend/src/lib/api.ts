'use server';

import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next/server';

// 로그인한 사용자의 쿠키 이름 //
//실전(production)에서는 조금 더 안전한 이름
const AUTH_COOKIE_NAME =
  process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token';

// 백엔드 서버 주소 //
const API_URL = process.env.API_URL || 'http://localhost:8000';

// 공통 API 호출 함수 //
//서버에 요청 보내는 역할
async function fetchApi<T>(endpoint: string, options: RequestInit = {}, token?: string) {
  //호출할 엔드포인트, 옵션들, 그리고 토큰을 받아서 실행
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  } as Record<string, string>;

  //토큰이 있으면 Authorization 헤더로 Bearer {token} 형식으로 추가해.
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  //fetch 옵션에 헤더를 추가하고, 캐시를 사용하지 않도록 설정.
  const config: RequestInit = {
    ...options,
    headers,
    cache: 'no-store',
  };

  //body가 문자열이 아니면 JSON.stringify() 해서 보낼 수 있게 만들어.
  if (options.body && typeof options.body !== 'string') {
    config.body = JSON.stringify(options.body);
  }

  //최종적으로 API를 호출함.
  const response = await fetch(`${API_URL}${endpoint}`, config);

  //실패했으면 에러를 던짐.
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  //204 No Content 응답이면, 빈 객체 반환.
  if (response.status === 204) {
    return {} as T;
  }

  //응답이 JSON이면 .json()으로 파싱, 아니면 .text()로 반환해.
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  } else {
    return response.text() as Promise<T>;
  }
}

export async function getUserTest(token?: string) {
  //서버 컴포넌트에서 호출된 경우
  //token이 없으면 서버에서 쿠키를 읽고, 있으면 그대로 사용해서 fetchApi로 호출해.
  if (!token && typeof window === 'undefined') {
    token = await getCookie(AUTH_COOKIE_NAME, { cookies });
  }

  return fetchApi<string>('/user-test', {}, token);
}
