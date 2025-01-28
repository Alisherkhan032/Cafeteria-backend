const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description :{
        type: String,
    },
    image:{
        type: String,
    },
    merchant :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
})

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;

/**
 * 
 * {
    "status": "success",
    "data": [
        {
            "_id": "6793ee024389c9e84d3b0c39",
            "name": "Ali Sher Khan",
            "email": "ali@gmail.com",
            "role": "merchant",
            "cart": [],
            "__v": 0
        }
    ]
}
 */