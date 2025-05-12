create table products 
(
	id serial primary key,
	guid UUID unique null,
	category_id integer,
	name varchar(255) not null,
	description text,
	price decimal(10,2),
	quantity integer,
	status smallint,
	created_at timestamp not null,
	updated_at timestamp not null	
);

create table categories 
(
	id serial primary key,
	guid UUID unique null,
	name varchar(255) not null,
	created_at timestamp not null,
	updated_at timestamp not null	
);

