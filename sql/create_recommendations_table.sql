CREATE SCHEMA IF NOT EXISTS disco;
USE disco;
DROP TABLE recommendations;
CREATE TABLE recommendations (category VARCHAR(200), rank BIGINT, url VARCHAR(200), thumbnail_url VARCHAR(200));

