const Location = require('../models/locationModel')

exports.postLocation = (req, res, next) => {

    const name = req.body.location;

    Location.findOne({
        name: name
    }
        , function (err, location) {
            if (location) {
                res.send("Location exists")
            }
            else {
                const newLocation = new Location();

                newLocation.name = name;
                newLocation.houses = [];

                newLocation.save();
                res.redirect('/location');
            }
        })
}


exports.getLocation = (req, res, next) => {

    res.render('location')

}
