class Destination {
    agencyname = "";
    country ="";
    city = "";
    days = "";
    constructor(agencyname, country, city, days) {
        this.agencyname = agencyname;
        this.country = country;
        this.city = city;
        this.days = days;
    }
};

module.exports = Destination;