--CREATE DATABASE WebshopExtensionSystem;

--\c WebshopExtensionSystem;

CREATE TABLE users (
    id bigint primary key generated always as identity,
    email text NOT NULL,
    name text NOT NULL
);

CREATE TABLE stores (
    id bigint primary key generated always as identity,
    user_id bigint NOT NULL,
    name text NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE products (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    description text NOT NULL,
    cur_price_id bigint NOT NULL,
    store_id bigint NOT NULL,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE prices (
    id bigint primary key generated always as identity,
    product_id bigint NOT NULL,
    amount bigint NOT NULL,
    start_date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date timestamp with time zone NOT NULL DEFAULT '9999-12-31 23:59:59',
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id bigint primary key generated always as identity,
    store_id bigint NOT NULL,
    customer_id bigint NOT NULL,
    order_date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status text NOT NULL DEFAULT 'pending'
);

CREATE TABLE ordered_products (
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    price_id bigint NOT NULL,
    amount bigint NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (price_id) REFERENCES prices(id)
);

CREATE TABLE customers (
    id bigint primary key generated always as identity,
    store_id bigint NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    shipping_address text NOT NULL,
    billing_address text NOT NULL,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);	

CREATE TABLE developers (
    id bigint primary key generated always as identity,
    FOREIGN KEY (id) REFERENCES users(id)
);

CREATE TABLE extensions (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    description text NOT NULL,
    developer_id bigint NOT NULL,
    FOREIGN KEY (developer_id) REFERENCES developers(id)
);

CREATE TABLE downloaded_extensions (
    extension_id bigint NOT NULL,
    store_id bigint NOT NULL,
    downloaded_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (extension_id) REFERENCES extensions(id),
    FOREIGN KEY (store_id) REFERENCES stores(id),
    PRIMARY KEY (extension_id, store_id)
);