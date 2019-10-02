CREATE TABLE cocktails (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ,
    name TEXT NOT NULL,
    category_id INTEGER
        REFERENCES categories(id) ON DELETE CASCADE,
    ingredients TEXT[] NOT NULL,
    steps TEXT[] NOT NULL,
    reviews TEXT[] NOT NULL
); 