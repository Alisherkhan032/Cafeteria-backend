const Dish = require('../models/Dish.model');

const getDishes = async (req, res) => {
    try {
        const dishes  = await Dish.find().populate('counter');
        res.status(200).json({ dishes });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const addNewDish = async (req, res) => {
    try {
        // console.log(req.body);
        const dishCreated = new Dish(req.body);
        const responseObj = await dishCreated.save();
        res.status(201).json({ 
            "message": "Dish added successfully",
            dish : responseObj
         });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id).populate('counter');
        if(!dish){
            return res.status(404).json({ msg: `Dish with id ${req.params.id} not found` });
        }
        res.status(200).json({ dish });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators : true}).populate('counter');      
        if(!dish){
            return res.status(404).json({ msg: `Dish with id ${req.params.id} not found` });
        }
        res.status(200).json({ 
            "message": "Dish updated successfully",
            dish
         });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id);
        if(!dish){
            return res.status(404).json({ msg: `Dish with id ${req.params.id} not found` });
        }
        res.status(200).json({ 
            "message": "Dish deleted successfully",
            dish
         });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getDishesByCounterId = async (req, res) => {
    try {
        const dishes = await Dish.find({ counter: req.params.counterId }).populate('counter');
        // if(dishes.length === 0){
        //     return res.status(404).json({ msg: `Dishes with counter id ${req.params.counterId} not found` });
        // }
        res.status(200).json({ dishes });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getDishes,
    addNewDish,
    getDishById,
    updateDish,
    deleteDish,
    getDishesByCounterId
}