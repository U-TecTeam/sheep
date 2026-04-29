import { headers } from 'next/headers';

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

async function getMockUserData(): Promise<UserProfileResponse> {
  const requestHeaders = await headers();
  const forwardedProto = requestHeaders.get('x-forwarded-proto');
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  const protocol = forwardedProto ?? (host?.startsWith('localhost') ? 'http' : 'https');

  if (!host) {
    throw new Error('无法确定当前请求主机，无法请求 mock 用户信息');
  }

  const response = await fetch(`${protocol}://${host}/api/mock/user`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('获取 mock 用户信息失败');
  }

  return response.json();
}

const tagColorMap: Record<UserTag['color'], string> = {
  blue: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
  emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
  violet: 'bg-violet-500/20 text-violet-300 border-violet-400/40',
  amber: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
};

export default async function Home() {
  const user = await getMockUserData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-10 shadow-2xl backdrop-blur-sm">
        <span className="w-fit rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
          Mock API Ready
        </span>

        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">服务端接口已完成 mock</h1>

        <div className="grid gap-3 rounded-xl border border-slate-700 bg-slate-800/60 p-5 text-slate-100">
          <p>
            <span className="text-slate-400">用户ID：</span>
            {user.data.userId}
          </p>
          <p>
            <span className="text-slate-400">昵称：</span>
            {user.data.nickname}
          </p>
          <p>
            <span className="text-slate-400">邮箱：</span>
            {user.data.email}
          </p>
          <p>
            <span className="text-slate-400">角色：</span>
            {user.data.roles.join(' / ')}
          </p>
          <p>
            <span className="text-slate-400">统计：</span>
            粉丝 {user.data.stats.followers} · 关注 {user.data.stats.following} · 发帖 {user.data.stats.posts}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {user.data.tags.map((tag) => (
            <span key={tag.id} className={`rounded-md border px-3 py-1 text-sm ${tagColorMap[tag.color]}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
