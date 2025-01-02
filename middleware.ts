import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/ads.txt') {
    return NextResponse.next(); // Allow access to ads.txt
  }
  return NextResponse.next();
}