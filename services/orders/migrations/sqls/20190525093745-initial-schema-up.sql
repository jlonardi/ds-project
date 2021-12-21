CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders (
  order_id      uuid NOT NULL,
  contact_id    integer NOT NULL,
  product_id    varchar(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW() NOT NULL,
  committed     boolean NOT NULL DEFAULT FALSE
);
