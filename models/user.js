class User {
    firstname = "";
    lastname = ";"
    username ="";
    password ="";
    constructor(firstname, lastname, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
    }
};

module.exports = User;