class User{
    constructor(login, password){
        this.login = login;
        this.password = password;
    }

    setId(id){
        this.id = id;
    }

    json(){
        if(this.id != null) return {id: this.id, login: this.login, password: this.password};
        return {login: this.login, password: this.password};
    }
}

module.exports = User;