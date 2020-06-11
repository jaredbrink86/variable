CREATE DATABASE variable;

CREATE TABLE transactions
(
    id SERIAL PRIMARY KEY,
    type_id INTEGER REFERENCES categories(id),
    amount NUMERIC NOT NULL
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL
);

INSERT INTO categories
    (category)
VALUES
    ('Groceries');
INSERT INTO categories
    (category)
VALUES
    ('Eating Out');
INSERT INTO categories
    (category)
VALUES
    ('Gas');
INSERT INTO categories
    (category)
VALUES
    ('Entertainment');
INSERT INTO categories
    (category)
VALUES
    ('Shopping');
INSERT INTO categories
    (category)
VALUES
    ('Travel');
INSERT INTO categories
    (category)
VALUES
    ('Personal Care');
