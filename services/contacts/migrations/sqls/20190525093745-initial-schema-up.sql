CREATE TABLE contacts (
  contact_id   SERIAL PRIMARY KEY,
  email         varchar(255) NOT NULL,
  address       varchar(255) NOT NULL,
  name          varchar(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW() NOT NULL,
  committed     boolean NOT NULL DEFAULT FALSE
);