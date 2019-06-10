var faker = require('faker');
var fs = require('fs');

var contacts = [];

//loop for creating each json record ( 32 records)
for(var i=0; i < 30; i++) {

    var user = {
    
    avatar: faker.image.avatar(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    mobile: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    country: faker.address.country()
    
    };
    //pushing data to the data.json file
    contacts.push(user);


}

//creating the file for the json data to be in
fs.writeFile('data.json', JSON.stringify({contacts}, null, 4), (err) => {
if (err);
console.log('JSON created');
});