// bring in the db connection and the trip schema 

const Mongoose = require('./db');
const Trip = require('./travlr');

// read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('../travlr-module1/app_server/data/trips.json', 'utf8'));

//delete ny existing record, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

//close mongo and exit 
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});