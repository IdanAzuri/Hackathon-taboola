SET @user_id='123';
SELECT
    *
FROM
    recommendations
WHERE
    category IN
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
            num_views DESC limit 2;
) ;