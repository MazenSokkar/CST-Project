export class User {
    constructor(id, name, username, password, role, address) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
        this.address = address;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }   
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get role() {
        return this._role;
    }   
    set role(value) {
        this._role = value;
    }
    get address() {
        return this._address;
    }   
    set address(value) {    
        this._address = value;
    }
}