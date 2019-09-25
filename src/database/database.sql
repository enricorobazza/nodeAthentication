create database if not exists authentication;

create table users(
    id int primary key auto_increment,
    login varchar(50) not null,
    password text not null
);