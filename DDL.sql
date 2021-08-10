
CREATE DATABASE IF NOT EXISTS EagerGamers;
GRANT USAGE ON *.* TO 'appuser'@'localhost' IDENTIFIED BY 'EtcK3zoh7wVdVaRk9ctz9DKpVCMJWU11';
GRANT ALL PRIVILEGES ON EagerGamers.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;

USE EagerGamers;

CREATE TABLE IF NOT EXISTS Product(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DOUBLE NOT NULL CHECK (price > 0),
  imageUrl VARCHAR(255) NOT NULL,
  rating int DEFAULT 0 CHECK(rating >= 0 && rating <= 5),
  platform enum('PS4', 'PS5', 'Switch'),
  category enum('sports', 'rpg', 'action', 'strategy', 'adventure'),
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Banner (
  pageUrl VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  PRIMARY KEY(pageUrl, imageUrl)
);