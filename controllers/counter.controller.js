const Counter = require('../models/counter.model');

const getAllCounters = async (req, res)=>{
    try {
        const counters = await Counter.find().populate({
            path : "merchant",
            select : "-password -cart"
        });
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

const updateCounter = async (req, res) => {
    try {
      // Validate that merchants array exists and has at least one merchant
      if (!req.body.merchant || !Array.isArray(req.body.merchant) || req.body.merchant.length === 0) {
        return res.status(400).json({
          message: "At least one merchant is required"
        });
      }
  
      // Convert merchant array to unique values using Set
      const uniqueMerchants = [...new Set(req.body.merchant)];
  
      // Update counter with unique merchants
      const counter = await Counter.findByIdAndUpdate(
        req.params.id,
        { ...req.body, merchant: uniqueMerchants },
        { 
          new: true, 
          runValidators: true 
        }
      ).populate({
        path: 'merchant',
        select: 'name email role' // Add any other fields you want to populate
      });
  
      if (!counter) {
        return res.status(404).json({
          message: "Counter not found"
        });
      }
  
      res.json({
        message: "Counter updated successfully",
        counter: counter
      });
  
    } catch (error) {
      console.error("Update counter error:", error);
      res.status(500).json({
        message: error.message || "Error updating counter"
      });
    }
  };

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