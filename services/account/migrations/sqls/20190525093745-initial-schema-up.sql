CREATE TABLE users (
  user_id       varchar(255) NOT NULL PRIMARY KEY,
  name          varchar(255)
);


INSERT INTO users (user_id, name) values ('123', 'Matti');
INSERT INTO users (user_id, name) values ('321', 'Teppo');