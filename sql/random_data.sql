-- Active: 1672915588497@@127.0.0.1@3306@resail

-- PRODUCTS ADD
INSERT INTO products values(
    1200, 'Laptop', 'Brand New laptop', 50000, 'https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg', '2022-05-01', 'adhith@duck.com'
),
(
    1201, 'Pen', 'Technotip ball point pen', 10, 'https://3.imimg.com/data3/AW/KQ/MY-4902064/fountain-pen-500x500.jpg', '2023-03-01', 'adhitht@duck.com'
)
;

SELECT x.order_id, GROUP_CONCAT(z.name), x.transaction_id, x.amount, x.status FROM orderlist x JOIN orders y on y.order_id= x.order_id ;

SELECT order_id FROM orderlist WHERE transaction_id IS NOT NULL;

SELECT order_id FROM orderlist;

SELECT x.order_id, y.name, y.exp_price, y.images, z.status FROM orders x JOIN products y ON x.product_id = y.product_id JOIN orderlist z ON z.order_id=x.order_id WHERE z.transaction_id IS NOT NULL;