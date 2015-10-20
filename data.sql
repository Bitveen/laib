create table books(
    id int unsigned not null auto_increment primary key,
    title varchar(255) not null,
    author varchar(255) not null,
    poster varchar(255) not null
);

create table tags(
    id int unsigned not null auto_increment primary key,
    title varchar(255) not null,
    book_id int unsigned not null,
    foreign key (book_id) references books(id)
);