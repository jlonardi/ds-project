CREATE TABLE customers (
  customer_id   SERIAL PRIMARY KEY,
  email         varchar(255) NOT NULL,
  address       varchar(255) NOT NULL,
  name          varchar(255) NOT NULL,
  committed     boolean NOT NULL DEFAULT FALSE
);

INSERT INTO customers (email, name, address, committed) values ('matti@teppo.foo', 'Matti', 'Turku', true);
INSERT INTO customers (email, name, address, committed) values ('teppo@matti', 'Teppo', 'Turku', true);