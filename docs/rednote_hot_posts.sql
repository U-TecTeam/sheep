-- Mock data generated based on RedNote (Xiaohongshu) trending topics, translated to English.
-- Aligned with the schema in docs/schema.sql
-- Covers five popular themes: Healing, Wellness, Street Vibe, Creative Mixology, and Office Aesthetic.
DO $$
DECLARE
    prod_ethiopia UUID;
    prod_colombia UUID;
    prod_brazil UUID;
BEGIN
    -- Get existing product UUIDs based on names in docs/schema.sql
    SELECT id INTO prod_ethiopia FROM products WHERE name = 'Ethiopia Yirgacheffe G1' LIMIT 1;
    SELECT id INTO prod_colombia FROM products WHERE name = 'Colombia Huila Supremo' LIMIT 1;
    SELECT id INTO prod_brazil FROM products WHERE name = 'Brazil Santos NY2' LIMIT 1;

    -- 1. Healing: Ethiopia Yirgacheffe
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'Emotional Barista', 
        'https://i.pravatar.cc/150?u=moody', 
        'This cup of coffee just cured all my Monday blues ☕️. The moment that jasmine aroma wafted out, I felt completely healed. The clean acidity of Yirgacheffe feels just like a breeze in early summer. #CoffeeDiary #Yirgacheffe #HealingVibes #SpecialtyCoffee', 
        ARRAY['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070'], 
        1540, 
        prod_ethiopia
    );

    -- 2. Wellness: Colombia
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'Lean Lifestyle Sweetie', 
        'https://i.pravatar.cc/150?u=sweetie', 
        'Seriously! If you''re in your fitness era, you HAVE to try this! The ingredient list is so clean—just the coffee beans themselves. The caramel sweetness of this medium-roast Colombia Huila is so good, you don''t even need sugar or milk. Pure bliss! #DietCoffee #CleanEating #ColombiaCoffee #BlackCoffee', 
        ARRAY['https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887'], 
        2890, 
        prod_colombia
    );

    -- 3. Street Vibe: Brazil
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'AJ on the Streets', 
        'https://i.pravatar.cc/150?u=ajie', 
        'Found this "Street Coffee" shop around a corner in the old town. No fancy decor, just this rich, soul-satisfying Brazil Santos. Notes of chocolate and nuts lingering on the tongue—this must be what freedom tastes like. #StreetCoffee #BrazilCoffee #CoffeeHunting #LocalLife', 
        ARRAY['https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1961'], 
        890, 
        prod_brazil
    );

    -- 4. Creative Mixology: Ethiopia Yirgacheffe
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'Mixology Lab', 
        'https://i.pravatar.cc/150?u=researcher', 
        '[First Look] This "Chenpi Yirgacheffe" combo is a match made in heaven! The aged citrus peel notes colliding with the bright Yirgacheffe profile creates such an incredible depth. Check the last photo for the recipe! #CreativeCoffee #RedNoteStyle #Yirgacheffe #CoffeeLover', 
        ARRAY['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974'], 
        4560, 
        prod_ethiopia
    );

    -- 5. Office Aesthetic: Colombia
    INSERT INTO posts (author_name, author_avatar, content, images, likes, related_product_id)
    VALUES (
        'Minimalist Lily', 
        'https://i.pravatar.cc/150?u=lily_minimal', 
        'Creating my office "survival" corner. A cup of Colombia Huila every morning is my little luxury in the corporate world. A Morandi-colored mug paired with rich coffee aroma—all that "office air" vanishes instantly. #OfficeCoffee #MinimalistLife #CoffeeAesthetic #WorkFuel', 
        ARRAY['https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070'], 
        1230, 
        prod_colombia
    );
END $$;
