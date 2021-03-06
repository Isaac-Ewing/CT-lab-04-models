DROP TABLE IF EXISTS bogs;
DROP TABLE IF EXISTS cogs;
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS fogs;

CREATE TABLE bogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    climate TEXT NOT NULL,
    substrate TEXT
);

CREATE TABLE cogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    functions TEXT NOT NULL,
    firstuse TEXT NOT NULL
);

CREATE TABLE logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    exists BOOLEAN NOT NULL
);

CREATE TABLE fogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    formedby TEXT NOT NULL
);