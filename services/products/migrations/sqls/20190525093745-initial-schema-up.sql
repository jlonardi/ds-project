CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  product_id      SERIAL PRIMARY KEY,
  name    varchar(255) NOT NULL
);

INSERT INTO products (name) VALUES ('Shirt');
INSERT INTO products (name) VALUES ('Shoes');
INSERT INTO products (name) VALUES ('Jacket');
INSERT INTO products (name) VALUES ('Trousers');