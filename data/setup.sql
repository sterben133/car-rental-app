DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT,
  model TEXT,
  year INTEGER,
  type TEXT,
  transmission TEXT,
  fuel TEXT,
  price REAL,
  available INTEGER,
  image TEXT
);

-- 插入 6 辆车
INSERT INTO cars (brand, model, year, type, transmission, fuel, price, available, image) VALUES
('Toyota', 'Camry', 2023, 'sedan', 'Automatic', 'Gasoline', 65, 1, 'toyota-camry.jpg'),
('Honda', 'CR-V', 2022, 'SUV', 'Automatic', 'Hybrid', 85, 0, 'honda-crv.jpg'),
('Ford', 'F-150', 2023, 'truck', 'Automatic', 'Diesel', 110, 1, 'ford-f150.jpg'),
('Audi', 'A4', 2023, 'sedan', 'Automatic', 'Gasoline', 95, 1, 'audi-a4.jpg'),
('BMW', '3 Series', 2022, 'sedan', 'Automatic', 'Gasoline', 100, 1, 'bmw-3-series.jpg'),
('Mercedes', 'GLC', 2023, 'SUV', 'Automatic', 'Hybrid', 120, 1, 'mercedes-glc.jpg');