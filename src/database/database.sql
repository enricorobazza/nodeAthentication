create database if not exists authentication;

create table users(
    id int primary key auto_increment,
    login varchar(50) not null,
    password text not null
);

create table clients(
    id int primary key auto_increment,
    name varchar(50) not null,
    email varchar(100) not null,
    number varchar(20) not null 
);