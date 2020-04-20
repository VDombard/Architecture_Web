class Destination {
    iddestination = "";
    idagency = "";
    country ="";
    city = "";
    days = "";
    constructor(iddestination, idagency, country, city, days) {
        this.iddestination = iddestination;
        this.idagency = idagency;
        this.country = country;
        this.city = city;
        this.days = days;
    }
};

module.exports = Destination;