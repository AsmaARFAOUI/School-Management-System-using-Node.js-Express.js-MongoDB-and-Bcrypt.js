const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 * @desc Create User
 * @route api/users
 * @method post
 * @access public
 */
const CreateUser = async(req, res) => {
    try{
        // Is user already exist
        let user = await User.findOne({ userEmail: req.body.userEmail});
        console.log(user)
        if(user){
            return res.status(400).json({ message: 'User already exist' });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);

        // Create new user
        const newUser = new User({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: hashedPassword
        });
        await newUser.save();

        // Send response to client
        res.status(201).json({ message: 'User created successfully '});
    }catch (error) {
        res.status(500).json({ message: error.message})
    }
} 

/**
 * @desc Get all users
 * @route api/users
 * @method get
 * @access public
 */
const GetAllUsers = async(req, res) => {
    try {
       const users = await User.find();
       res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc Get user by id
 * @route api/users/:id
 * @method get
 * @access public
 */
const GetUserById = async(req, res) => {
    try {
      // is user exist
       let user = await User.findById(req.params.id);
       if(!user) {
        res.status(404).json({ message: 'User not found'});
       } 
      // Send response to client 
       res.status(200).json(user);
    } catch (error) {
       res.status(500).json({ message: error.message}); 
    }
}

/**
 * @desc Update user
 * @route api/users/:id
 * @method put
 * @access public
 */
const UpdateUser = async(req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if(!user) {
           return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndUpdate(req.params.id, {
            $set: {
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userPassword: req.body.userPassword
            }
        });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc Delete user
 * @route api/users/:id
 * @method Delete
 * @access public
 */
const DeleteUser  = async(req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if(!user){
           return res.status(404).json({ message: 'User not found' }); 
        }
        await User.findByIdAndDelete({ _id: req.params.id});
        res.status(200).json({ message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    CreateUser,
    GetAllUsers, 
    GetUserById,
    UpdateUser,
    DeleteUser
}