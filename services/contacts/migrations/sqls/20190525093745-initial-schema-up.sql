CREATE TABLE contacts (
  contact_id   SERIAL PRIMARY KEY,
  email         varchar(255) NOT NULL,
  address       varchar(255) NOT NULL,
  name          varchar(255) NOT NULL,
  committed     boolean NOT NULL DEFAULT FALSE
);

INSERT INTO contacts (email, name, address, committed) values ('matti@teppo.foo', 'Matti', 'Turku', true);
INSERT INTO contacts (email, name, address, committed) values ('teppo@matti', 'Teppo', 'Turku', true);