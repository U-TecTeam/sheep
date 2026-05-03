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

-- 插入扩展后的初始商品数据
INSERT INTO products (name, description, price, image_url, flavor_profile, roast_level, process, tags)
VALUES 
('Ethiopia Yirgacheffe G1', '一款极致纯净的浅烘咖啡。带有强烈的茉莉花香、柠檬酸质以及清爽的红茶感。适合手冲或冰滴，展现埃塞俄比亚高海拔产区的独特风味。', 128, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop', '{"acid": 9, "body": 3, "sweet": 7, "bitter": 1, "aroma": 10}', 'light', 'washed', ARRAY['floral', 'citrus', 'tea-like']),
('Colombia Huila Supremo', '中度烘焙带来的平衡之作。焦糖般的甜感融合了微妙的核果酸质，尾韵带有坚果和黑巧克力的香气。是一款极其全能的豆子，无论是美式还是拿铁都表现出色。', 98, 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1974&auto=format&fit=crop', '{"acid": 5, "body": 6, "sweet": 8, "bitter": 3, "aroma": 7}', 'medium', 'washed', ARRAY['caramel', 'nutty', 'balanced']),
('Brazil Santos NY2', '深烘爱好者的首选。低酸质，极高醇厚度。风味主调为黑巧克力和烤花生，口感浓郁、顺滑。非常适合搭配牛奶，制作出一杯完美的意式浓缩。', 88, 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1961&auto=format&fit=crop', '{"acid": 2, "body": 9, "sweet": 6, "bitter": 5, "aroma": 5}', 'dark', 'natural', ARRAY['chocolate', 'bold', 'smooth']),
('Sumatra Mandheling G1', '经典的半水洗处理法带来了独特的草本和泥土芳香。中深烘焙度，带有肉桂和甘草的香气，酸度极低，回甘悠长。', 115, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop', '{"acid": 3, "body": 8, "sweet": 7, "bitter": 4, "aroma": 6}', 'medium', 'honey', ARRAY['herbal', 'earthy', 'spicy']),
('Costa Rica Tarrazu', '蜜处理赋予了它丰富的蜂蜜与红糖般的甜感。在浅中烘焙下，依然保留了优雅的明亮酸质和丝滑的质感。', 135, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop', '{"acid": 6, "body": 5, "sweet": 10, "bitter": 2, "aroma": 8}', 'light', 'honey', ARRAY['honey', 'syrupy', 'clean']),
('Kenya AA Plus', '以极致的酸度而闻名。复杂的黑莓和红醋栗风味，如酒一般的质感。是追求味觉刺激与层次感的资深饮家首选。', 158, 'https://images.unsplash.com/photo-1524350303351-806088de2ead?q=80&w=1974&auto=format&fit=crop', '{"acid": 10, "body": 4, "sweet": 6, "bitter": 2, "aroma": 9}', 'light', 'washed', ARRAY['berry', 'winey', 'complex']);
