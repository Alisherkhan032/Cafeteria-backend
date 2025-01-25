const User = require('../models/user.model');

const getAllUser = async (req, res)=>{
    try {
        const users = await User.find().select('-cart, -password');
        if(users.length === 0){
            return res.status(404).json({
                status: 'failed',
                message: 'No user found'
            });
        }
        res.json({
            status: 'success',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

const addUser = async (req, res)=>{
    try {
        const user = new User(req.body);
        await user.save();
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

'@access Admin'
const getUserById = async (req, res)=>{
    try {
        const user = await User.findById(req.params.id).select('-cart, -password');
        if(!user){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

const updateUser = async (req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true} // re-run model validators
        )
        if(!user){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.json({
            status: 'success',
            message: 'User updated',
            data: user
        });
    } catch (error) {
        
    }
}

const deleteUser = async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.json({
            status: 'success',
            message: 'User deleted'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

module.exports = {
    getAllUser,
    addUser,
    getUserById,
    updateUser,
    deleteUser
}