DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  unique_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (unique_id)
);

insert into products (product_name, department_name, price, stock_quantity)
Values
("Elephant Pen", "Office Supplies", 40.69, 52),
("Ray Rice Super Bowl Ring", "Sports", 3000.69, 1),
("Mexican Sombrero", "International", 15.00, 100),
("Cinco de Drinko T-Shirt", "Clothing", 20.69,100),
("Shooter! Cutoff Flannel -- Limited Edition", "Fashion", 80.69,52);

SELECT * FROM products;
