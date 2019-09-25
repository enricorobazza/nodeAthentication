const db = require('../../database');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');


class UsersDao{
    async insert(user){
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;

        return new Promise((resolve, reject) => {
            db.query("insert into users values(0,?,?)", [user.login, user.password], function(err, result, fields){
                if(err) return reject(err);
                if(!result) return reject("Insertion failed");
                user.setId(result.insertId);
                resolve(user);
            });
        });
    }
    getAll(){
        return new Promise((resolve, reject) => {
            db.query("select * from users;", [], function(err, result, fields){
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    update(user){
        return new Promise((resolve, reject)=>{
            db.query("update users set login = ? and password = ? where id = ?", [user.login, user.password, user.id], function(err){
                if(err) reject(err);
                resolve(user);
            });
        });
    }

    delete(id){
        return new Promise((resolve, reject)=>{
            db.query("delete from users where id = ?", [id], function(err){
                if(err) reject(err);
                resolve(id);
            });
        });
    }

    get(id){
        return new Promise((resolve, reject)=>{
            db.query("select * from users where id = ?", [id], function(err, result, fields){
                if(err) reject(err); // Error
                if(result.length == 0) resolve({}); // No result
                var user = new User(result[0].login, result[0].password);
                user.setId(id);
                resolve(user);
            })
        });
    }

    getByLogin(login){
        return new Promise((resolve, reject)=>{
            db.query("select * from users where login = ?", [login], function(err, result, fields){
                if(err) return reject(err); // Error
                if(result.length == 0) return resolve(false); // No result
                var user = new User(result[0].login, result[0].password);
                user.setId(result[0].id);
                resolve(user);
            })
        });
    }
}

module.exports = new UsersDao();