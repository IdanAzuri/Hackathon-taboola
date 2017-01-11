CREATE SCHEMA IF NOT EXISTS disco;
USE disco;

DROP TABLE recommendations;
DROP TABLE users;
DROP TABLE user_history;
DROP TABLE user_history_categories;

CREATE TABLE recommendations (category VARCHAR(200), rank BIGINT, url VARCHAR(200), screenshot_url VARCHAR(200),  thumbnail_url VARCHAR(200));
CREATE TABLE users (user_id  VARCHAR(200), create_date datetime);
CREATE TABLE user_history (id bigint(20), user_id VARCHAR(200), url VARCHAR(200), page_url VARCHAR(200), visit_time datetime);
CREATE TABLE user_history_categories (user_history_id VARCHAR(200), user_id VARCHAR(200), url VARCHAR(200), page_url VARCHAR(200), visit_time datetime, category VARCHAR(200));

//select * from disco.recommendations;
//delete from disco.recommendations

