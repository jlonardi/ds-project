CREATE TABLE customers (
  customer_id   varchar(255) NOT NULL PRIMARY KEY,
  name          varchar(255)
);


INSERT INTO customers (customer_id, name) values ('123', 'Matti');
INSERT INTO customers (customer_id, name) values ('321', 'Teppo');