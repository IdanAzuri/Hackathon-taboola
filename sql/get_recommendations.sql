SET @user_id='3cb83dad4235ec35e3695ff5213a134f9335499b9fb18e73e9a869a86630607a';
-- FROM    (select * from user_history cross join (select category from category order by rand() limit 2) t ) tt
 -- use user_history_categories instead

SELECT  *
FROM    (
        SELECT  r.*
        FROM    recommendations r
                INNER JOIN (
                        SELECT  category,
                                COUNT(*) AS num_views
                        FROM    (select * from user_history cross join (select category from category order by rand() limit 2) t ) tt
                        WHERE   user_id = @user_id
                        GROUP BY category
                        ORDER BY num_views DESC
                        LIMIT 2 ) AS user_top_categories
                        ON user_top_categories.category = r.category
        ORDER BY rank ASC
        LIMIT 10
        ) recs_for_top_cat
WHERE   NOT EXISTS(
                SELECT   1
                FROM    user_history
                WHERE   user_id = @user_id
                        AND url = recs_for_top_cat.url)