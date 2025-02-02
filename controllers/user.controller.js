const Counter = require("../models/counter.model");
const User = require("../models/user.model");

const getAllUser = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;

    console.log('search: ', search) 
    
    // Build filter object
    let filter = {};
    
    // Add role filter if provided
    if (role && role !== 'all') {
      filter.role = role;
    }
    
    // Add search filter if provided
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination values
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    // Fetch users with pagination
    const users = await User.find(filter)
      .select("-cart -password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      status: "success",
      users,
      totalPages,
      currentPage: parseInt(page),
      totalUsers
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// const addUser = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
    
//     // Remove sensitive data before sending response
//     const userResponse = user.toObject();
//     delete userResponse.password;
//     delete userResponse.cart;

//     res.json({
//       status: "success",
//       data: userResponse,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

const updateUser = async (req, res) => {
  try {
    const { role } = req.body;

    // Find the user first
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // If the role is being changed from "merchant" to something else
    if (user.role === "merchant" && role !== "merchant") {
      // Check how many merchants exist for the same counter
      const merchantCount = await User.countDocuments({ 
        counter: user.counter, 
        role: "merchant" 
      });

      // If the user is the only merchant for that counter, prevent role change
      if (merchantCount === 1) {
        return res.status(400).json({
          status: "error",
          message: "Cannot change role. This user is the only merchant for this counter.",
        });
      }
    }

    // Proceed with updating the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true,
        select: '-password -cart' // Exclude sensitive fields from response
      }
    );

    res.json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-cart -password");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getCountersByMerchantId = async (req, res) => {
  try {
    const counters = await Counter.find({
      merchant: req.params.merchantId,
    }).populate({
      path: "merchant",
      select: "-password",
    });
    
    if (counters.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No counter found",
      });
    }
    
    res.json({
      status: "success",
      counters: counters,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  // addUser,
  getUserById,
  updateUser,
  deleteUser,
  getCountersByMerchantId,
};