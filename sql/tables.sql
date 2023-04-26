

CREATE TABLE users (
	email VARCHAR(500),
	name VARCHAR(500),
	picture VARCHAR(500),
	hostel VARCHAR(500),
	hostel_room VARCHAR(10),
	Mobile VARCHAR(15)
);

CREATE TABLE products (
	product_id INT,
	name VARCHAR(500),
	description VARCHAR(1000),
	ask_price int,
	exp_price int,
	images VARCHAR(500),
	posted_on DATETIME,
	email VARCHAR(500)
);

CREATE TABLE orders(
	order_id int,
	product_id int,
	email VARCHAR(500)
);

CREATE TABLE cart(
	card_id VARCHAR(100),
	product_id int,
	email VARCHAR(500)
);

CREATE TABLE orderlist(
	order_id int,
	email VARCHAR(500),
	transaction_id int,
	amount int
);