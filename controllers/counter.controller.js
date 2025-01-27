const Counter = require('../models/counter.model');

const getAllCounters = async (req, res)=>{
    try {
        const counters = await Counter.find().populate('merchant');
        res.json({counters});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const createCounter = async (req, res)=>{
    try {
        const counter = await Counter.create(req.body);
        res.json({counter});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getCounterById = async (req, res)=>{
    try {
        const counter = await Counter.findById(req.params.id).populate('merchant');
        res.json(counter);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const updateCounter = async (req, res)=>{
    try {
        const counter = await Counter.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).populate('merchant');
        res.json({
            "message": "Counter updated successfully",
            "counter": counter
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const deleteCounter = async (req, res)=>{
    try {
        await Counter.findByIdAndDelete(req.params.id);
        res.json({
            "message": "Counter deleted successfully"
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = {
    getAllCounters,
    createCounter,
    getCounterById,
    updateCounter,
    deleteCounter
}