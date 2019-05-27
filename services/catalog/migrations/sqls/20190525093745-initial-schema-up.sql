CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  product_id    uuid NOT NULL DEFAULT uuid_generate_v4(),
  name          varchar(255) NOT NULL
);

INSERT INTO products (name) VALUES ('product one');
INSERT INTO products (name) VALUES ('product two');