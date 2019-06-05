CREATE DATABASE wine_db;
USE wine_db;

-- Create tables for raw data to be loaded into
CREATE TABLE wine (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT,
  points INT,
  country CHAR(30),
  province CHAR(30),
  variety TEXT,
  price DOUBLE
);

ALTER DATABASE wine_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE wine CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

SELECT * FROM wine;