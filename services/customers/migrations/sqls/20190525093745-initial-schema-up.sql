CREATE TABLE customers (
  customer_id   varchar(255) NOT NULL PRIMARY KEY,
  name          varchar(255),
  committed     boolean NOT NULL
);

INSERT INTO customers (customer_id, name, committed) values ('123', 'Matti', true);
INSERT INTO customers (customer_id, name, committed) values ('321', 'Teppo', true);