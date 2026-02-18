export class User {
    constructor(id, name, username, password, role, address, createdAt) {
        this.Id = id;
        this.Name = name;
        this.Username = username;
        this.Password = password;
        this.Role = role;
        this.Address = address;
        this.CreatedAt = createdAt;
    }
}