import { requestApi } from '@/lib/api';

export interface UserStats {
  followers: number;
  following: number;
  posts: number;
}

export interface UserTag {
  id: string;
  label: string;
  color: 'blue' | 'emerald' | 'violet' | 'amber';
}

export interface UserProfileResponse {
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

export async function getCurrentUserProfile() {
  return requestApi<UserProfileResponse>('/api/mock/user');
}
