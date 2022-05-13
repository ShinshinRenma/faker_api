const express = require("express");
const app = express();
const PORT = 8000;
const { faker } = require("@faker-js/faker");

class User {
    constructor() {
        this.lastName = faker.name.lastName();
        this.firstName = faker.name.firstName();
        this.password = faker.internet.password();
        this.email = faker.internet.email(this.firstName, this.lastName);
        this.phoneNumber = faker.phone.phoneNumber();
        this._id = faker.random.numeric(3, {} );
    }
}

class Company {
    constructor() {
        this._id = faker.random.numeric(3, {});
        this.name = faker.company.companyName();
        this.address = {
            street: faker.address.streetAddress(),
            city: faker.address.cityName(),
            state: faker.address.state(),
            country: faker.address.country()
        }
        this.address.zipcode = faker.address.zipCodeByState(this.address.state);
    }
}


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// API Routes
app.get('/api/users/new', (req, res) => {
    const newUser = new User();
    res.json(newUser);
})
app.get('/api/companies/new', (req, res) => {
    const newCompany = new Company();
    res.json(newCompany);
})
app.get('/api/user/company', (req, res) => {
    const newUser = new User();
    const newCompany = new Company();
    res.json({user: newUser, company: newCompany});
})



app.listen(PORT, () => console.log(`>>SERVER started on port ${PORT} and is listening for requests to respond to.`));