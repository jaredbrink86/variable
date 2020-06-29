CREATE DATABASE variable;

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE transactions
(
    id SERIAL PRIMARY KEY,
    transaction_date DATE NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    transaction_amount VARCHAR NOT NULL
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


SELECT t.id, t.transaction_date, t.transaction_amount, c.category
FROM transactions AS t
    INNER JOIN categories AS c
    ON t.category_id = c.id