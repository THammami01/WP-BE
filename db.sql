SHOW DATABASES;

USE `WP-FINAL`;

SHOW TABLES;

SELECT * FROM wp_posts WHERE ID = 5338;

DESC wp_posts;

SELECT T2.ID, T2.guid
FROM wp_posts as T1, wp_posts as T2
WHERE T1.ID = 5338 AND T1.ID = T2.post_parent AND T2.post_type = "attachment";

SELECT * FROM wp_comments
WHERE comment_post_ID = 5338;

SELECT * FROM wp_posts WHERE post_type = "product_variation" AND post_status = "publish";

SELECT * FROM wp_posts WHERE post_parent = 5338;

SELECT * FROM wp_terms;
SELECT * FROM wp_term_relationships;
SELECT * FROM wp_term_taxonomy;

-- GLOBAL TERMS
SELECT taxonomy, name FROM wp_terms as T1, wp_term_relationships as T2, wp_term_taxonomy as T3
WHERE T1.term_id = T3.term_id AND T2.term_taxonomy_id = T3.term_taxonomy_id
AND object_id = 5338;

SELECT * FROM wp_postmeta WHERE meta_key = '_sku';

SELECT CONCAT("variation_id: ", T1.ID, ", ", T1.post_excerpt, ", SKU: ", T2.meta_value) as res 
FROM wp_posts as T1, wp_postmeta as T2, wp_postmeta as T3
WHERE T1.post_parent = 5338 AND T1.post_type = "product_variation"
	AND T1.ID = T2.post_id AND T2.meta_key = '_sku'
	AND T1.ID = T3.post_id AND T3.meta_key = 'regular_price'
ORDER BY T1.menu_order;


SELECT post_id, COUNT(meta_value) as count FROM wp_postmeta
WHERE post_id IN (5338, 5346, 5347, 5352)
GROUP BY post_id
ORDER BY count;

SELECT post_id, meta_key, meta_value as count FROM wp_postmeta
WHERE post_id IN (5338, 5346, 5347, 5352)
ORDER BY post_id;

SELECT post_id, meta_key, meta_value FROM wp_postmeta
WHERE post_id = 5338
ORDER BY post_id;
