CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(100) NOT NULL,
    createdAt DATE
);

INSERT INTO category (type, createdAt) VALUES
('clothe', '2023-09-21'),
('car', '2023-09-21'),
('other', '2023-09-21');

INSERT INTO category (type, createdAt) VALUES
('vehicule', '2023-09-21');

SELECT * FROM category;

PRAGMA foreign_keys = ON;
CREATE TABLE ad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    owner VARCHAR (100),
    price INTEGER,
    picture VARCHAR (100),
    location VARCHAR (100),
    createdAt DATE,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

PRAGMA foreign_keys = ON;
INSERT INTO ad (title, description, owner, price, picture, location, createdAt, category_id)
VALUES
  ('iPhone X en excellent état', 'Vend iPhone X en parfait état, avec chargeur et boîte. Aucune égratignure.', 'John Doe', 450, 'iphone_x.jpg', 'Paris', '21/09/2023', 3),
  ('voiture peugeot', 'Voiture peugeot neuve.', 'Alice Smith', 12000, 'oak_car.jpg', 'Lyon', '21/09/2023', 2),
  ('casquette hetm', 'Belle casquette hetm neuve', 'Sophie Martin', 10, 'casquette.jpg', 'Bordeaux', '21/09/2023', 1);

// affiche tout de la table ad
SELECT * FROM ad;

// affiche tout de la table ad avec la category_id = 1
SELECT * FROM ad WHERE category_id = 1;

// affiche tout de la table ad avec la category_id = 1 et 2
SELECT * FROM ad WHERE category_id IN (1, 2);

// Calcul une moyenne du prix des annonces de la category_id 3
SELECT AVG(price) AS average_price
FROM ad
WHERE category_id = 3;

// Affiche les annonces dont le type de category commence par "v"
SELECT ad.*
FROM ad
JOIN category ON ad.category_id = category.id
WHERE category.type LIKE 'v%';
