SET @user_id='123';

SELECT
    *
FROM
    recommendations r
INNER JOIN
    (
        SELECT
            category,
            COUNT(*) AS num_views
        FROM
            user_history_categories
        WHERE
            user_id = @user_id
        GROUP BY
            category
        ORDER BY
            num_views DESC limit 2 ) user_top_categories
INNER JOIN
    (
        SELECT
            url
        FROM
            user_history_categories
        WHERE
            user_id = @user_id ) user_url_history
ON
    r.category = user_top_categories.category
AND user_url_history.url = r.url