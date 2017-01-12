/*select * from user_history;
select * from disco.recommendations; */

SELECT category, count(*) views_amount FROM user_history where category != 'NOT_SUPPORTED' group by 1 order by 2 desc;
SELECT user_id, category, count(*) FROM user_history where category != 'NOT_SUPPORTED' group by 1,2 order by 1 desc,3 desc;
