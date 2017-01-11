
SELECT
   vv.id,
   vv.url,
   vv.item_type,
   --sum(v.revenue) AS revenue
   sum(v.num_recs) AS num_recs

FROM
   rawdata.source_stats_aggregation v
INNER JOIN
   trc.publishers p
ON
   v.publisher_id = p.id
INNER JOIN
   trc.videos vv
ON
   vv.id=v.source_id
WHERE
   data_timestamp > '2017-01-07 00:00:00'
AND p.language = 'en'
AND vv.item_type  like 'homepage'
--AND vv.item_type not like 'homepage'
GROUP BY
   vv.id,
   vv.url,
   vv.item_type 
ORDER BY
   num_recs DESC limit 100;
