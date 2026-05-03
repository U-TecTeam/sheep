-- 使用子查询根据名称动态获取产品 UUID，确保外键关联正确
DO $$
DECLARE
    prod_ethiopia UUID;
    prod_colombia UUID;
    prod_brazil UUID;
    prod_sumatra UUID;
    prod_kenya UUID;
BEGIN
    SELECT id INTO prod_ethiopia FROM products WHERE name = 'Ethiopia Yirgacheffe G1' LIMIT 1;
    SELECT id INTO prod_colombia FROM products WHERE name = 'Colombia Huila Supremo' LIMIT 1;
    SELECT id INTO prod_brazil FROM products WHERE name = 'Brazil Santos NY2' LIMIT 1;
    SELECT id INTO prod_sumatra FROM products WHERE name = 'Sumatra Mandheling G1' LIMIT 1;
    SELECT id INTO prod_kenya FROM products WHERE name = 'Kenya AA Plus' LIMIT 1;

    -- 1. 耶加雪菲评测
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'BrewMaster Jack', 
        'https://i.pravatar.cc/150?u=jack', 
        '今天试了这款耶加雪菲，V60手冲，水温92度，粉水比1:15。茉莉花的香气简直炸裂，柠檬酸质非常干净，像是在喝一杯高级的花茶！', 
        ARRAY['https://images.unsplash.com/photo-1544787210-2213d2492f11?q=80&w=2070&auto=format&fit=crop'], 
        124, 
        prod_ethiopia
    );

    -- 2. 哥伦比亚开箱
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'Coffee Lover Lily', 
        'https://i.pravatar.cc/150?u=lily', 
        '订阅盒到啦！这颗哥伦比亚惠兰 Supremo 真的是全能王。中度烘焙把焦糖甜感发挥到了极致，早上配一片全麦吐司简直是绝配。', 
        ARRAY['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'], 
        89, 
        prod_colombia
    );

    -- 3. 巴西意式分享
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'Espresso Pro Mike', 
        'https://i.pravatar.cc/150?u=mike', 
        '深度烘焙的魅力！这款巴西豆子做出的意式浓缩油脂非常厚，巧克力和坚果的香气在加了牛奶后变成了醇厚的榛果拿铁感。', 
        ARRAY['https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070&auto=format&fit=crop'], 
        56, 
        prod_brazil
    );

    -- 4. 苏门答腊硬核指南
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'Aris_Brew', 
        'https://i.pravatar.cc/150?u=aris', 
        '曼特宁爱好者集合！那种独特的草本和泥土气息真的太迷人了。建议用爱乐压来冲煮，能更好地压榨出它的醇厚度。', 
        ARRAY['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop'], 
        213, 
        prod_sumatra
    );

    -- 5. 肯尼亚酸质挑战
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'Acid Hunter', 
        'https://i.pravatar.cc/150?u=hunter', 
        '这是我喝过酸度最明亮的肯尼亚 AA！黑莓和醋栗的风味非常激进，甚至带有一点红酒的质感。不适合新手，但老饕绝对会爱死。', 
        ARRAY['https://images.unsplash.com/photo-1524350303351-806088de2ead?q=80&w=1974&auto=format&fit=crop'], 
        45, 
        prod_kenya
    );
END $$;
