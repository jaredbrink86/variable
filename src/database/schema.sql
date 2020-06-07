CREATE DATABASE variable;

CREATE TABLE transactions
(
    id SERIAL PRIMARY KEY,
    type_id INTEGER REFERENCES transaction_types(id),
    amount NUMERIC NOT NULL
);

CREATE TABLE transaction_types
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
