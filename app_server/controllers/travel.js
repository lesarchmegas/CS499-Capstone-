const Trip = require('../../app_api/models/travlr');

const travel = async function (req, res) {
    try {
        const trips = await Trip.find({});

        res.render('travel', {
            title: "Travlr Getaways",
            trips: trips
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    travel
};