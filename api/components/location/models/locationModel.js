const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const locationSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    houses: [
        {
            houseId: {
                type: String
            },
        }
    ]
})



const Location = mongoose.model("Location", locationSchema);

module.exports = Location;