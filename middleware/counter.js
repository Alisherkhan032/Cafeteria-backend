const Counter = require('../models/counter.model')

const populateCounter = async (req, res, next) => {
    const {counterId} = req.query;
    console.log('counterId', counterId); 
    try {
        const counter = await Counter.findById(counterId);
        if(!counter){
            return res.status(404).json({ msg: `Counter with id ${counterId} not found` });
        }
        req.counter = counter;
        next();
    } catch(error){
        res.status(500).json({ msg: error });
    }
}

module.exports = {populateCounter};