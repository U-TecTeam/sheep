import { NextResponse } from 'next/server';

interface UserStats {
  followers: number;
  following: number;
  posts: number;
}

interface UserTag {
  id: string;
  label: string;
  color: 'blue' | 'emerald' | 'violet' | 'amber';
}

interface UserProfileResponse {
  code: number;
  message: string;
  traceId: string;
  data: {
    userId: string;
    nickname: string;
    email: string;
    roles: string[];
    stats: UserStats;
    tags: UserTag[];
    updatedAt: string;
  };
}

export async function GET() {
  const payload: UserProfileResponse = {
    code: 0,
    message: 'success',
    traceId: 'mock-trace-20260429',
    data: {
      userId: 'u_10001',
      nickname: 'demo-user',
      email: 'demo@example.com',
      roles: ['admin', 'editor'],
      stats: {
        followers: 248,
        following: 96,
        posts: 42,
      },
      tags: [
        { id: 't-1', label: '高活跃', color: 'emerald' },
        { id: 't-2', label: '付费用户', color: 'violet' },
      ],
      updatedAt: new Date('2026-04-29T00:00:00.000Z').toISOString(),
    },
  };

  return NextResponse.json(payload);
}
