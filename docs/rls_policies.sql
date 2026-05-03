-- ==========================================
-- Supabase 行级安全性 (RLS) 访问策略
-- 用于解决表中有数据但前端返回为空的问题
-- ==========================================

-- 1. 商品表 (Products): 允许所有人（包括未登录用户）读取
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access for products" ON products;
CREATE POLICY "Allow public read access for products" 
ON products FOR SELECT 
TO anon, authenticated 
USING (true);


-- 2. 社区帖子表 (Posts): 允许所有人读取
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access for posts" ON posts;
CREATE POLICY "Allow public read access for posts" 
ON posts FOR SELECT 
TO anon, authenticated 
USING (true);


-- 3. 用户画像表 (Profiles): 仅允许用户读取和更新自己的数据
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to read their own profile" ON profiles;
CREATE POLICY "Allow users to read their own profile" 
ON profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow users to update their own profile" ON profiles;
CREATE POLICY "Allow users to update their own profile" 
ON profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);


-- 4. 订阅管理表 (Subscriptions): 仅允许用户查看自己的订阅
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to read their own subscriptions" ON subscriptions;
CREATE POLICY "Allow users to read their own subscriptions" 
ON subscriptions FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);
