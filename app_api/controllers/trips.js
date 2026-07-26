const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips
//regardles of outcome, response must include html status  code
// and JSON message to the requesting client

const tripsList = async(req, res) => {
    const q = await Model 
    .find({}) // no filter return all records
    .exec();


    //uncomment to log query
    // console.log(q);


    if(!q)
    { // db returned nothing
        return res
                .status(404)
                .json(err)
    }
    else
    {  //db returning trip data
        return res
                .status(200)
                .json(q)
    }
}


// get: /tips/:tripCode - lists a single trip
// rtegardless of outcome, response must include HTML status code 
// and JSON message to the requesting client 

const tripsFindByCode = async(req, res) => {
    const q = await Model
    .find({'code' : req.params.tripCode}) // return single record 
    .exec();

    //uncomment to log query
    // console.log(q);


    if(!q)
    {
        return res
                .status(404)
                .json(err)
    }
    else
    {
        return res
                .status(200)
                .json(q)
    }
}

const tripsAddTrip = async (req, res, next) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        //error test for enhancement 1 centralized error handling
        throw new Error("Testing centralized error handler");
        const q = await newTrip.save();
        return res.status(201).json(q);
    } 
    catch (err) {
        next(err);
    }
//    console.log("DESCRIPTION RECEIVED:", req.body.description);
 //   console.log("BODY RECEIVED:", req.body);
};

const tripsUpdateTrip = async (req, res) => {

    try {
        const updatedTrip = await Model.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        return res.status(200).json(updatedTrip);

    } catch (err) {
        return res.status(500).json(err.message);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};

console.log("POST HIT");

