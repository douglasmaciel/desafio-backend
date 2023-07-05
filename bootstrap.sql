DROP TABLE IF EXISTS houses;
CREATE TABLE houses (
  id UUID PRIMARY KEY,
  name varchar(256) NOT NULL,
  region varchar(256) NOT NULL,
  foundationDate varchar(256) NOT NULL,
  lord JSON NULL,
  available BOOLEAN NOT NULL
);