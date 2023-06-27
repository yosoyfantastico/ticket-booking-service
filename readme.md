````SQL
CREATE TABLE seats_price (id SERIAL PRIMARY KEY, seat_class VARCHAR(255),min_price NUMERIC, normal_price NUMERIC,max_price NUMERIC);
````
````SQL
CREATE TABLE seats (id SERIAL PRIMARY KEY, seat_identifier VARCHAR(50), seat_class VARCHAR(20));
````
````SQL
SELECT * FROM seats ORDER BY id DESC LIMIT 1;
````

SELECT seat_identifier, seat_class, is_booked FROM seats ORDER BY seat_class;


CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  seat_class VARCHAR(20) NOT NULL,
  price_booked DECIMAL(10, 2) NOT NULL,
  seat_identifier VARCHAR(20) NOT NULL,
  user_id INT REFERENCES users(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL
);
