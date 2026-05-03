-- 1. 商品表
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  flavor_profile JSONB,
  roast_level TEXT,
  process TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 社区帖子表
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  author_avatar TEXT,
  content TEXT,
  images TEXT[],
  likes INTEGER DEFAULT 0,
  related_product_id UUID REFERENCES products(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 用户画像表 (扩展 auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT,
  avatar_url TEXT,
  taste_profile JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. 订阅管理表
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  frequency TEXT NOT NULL, -- e.g., '2weeks', '1month'
  status TEXT DEFAULT 'active',
  next_delivery TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 插入初始商品数据
INSERT INTO products (name, description, price, image_url, flavor_profile, roast_level, process, tags)
VALUES 
('Ethiopia Yirgacheffe', 'Floral and citrus notes with a tea-like body.', 128, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop', '{"acid": 8, "body": 4, "sweet": 7, "bitter": 2, "aroma": 9}', 'light', 'washed', ARRAY['floral', 'citrus', 'clean']),
('Colombia Huila', 'Balanced with caramel sweetness and nutty undertones.', 98, 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1974&auto=format&fit=crop', '{"acid": 5, "body": 6, "sweet": 8, "bitter": 3, "aroma": 6}', 'medium', 'washed', ARRAY['caramel', 'nutty', 'balanced']),
('Brazil Santos', 'Low acidity, heavy body with chocolate and roasted peanut notes.', 88, 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1961&auto=format&fit=crop', '{"acid": 2, "body": 8, "sweet": 6, "bitter": 4, "aroma": 5}', 'dark', 'natural', ARRAY['chocolate', 'nutty', 'bold']);
