const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 * @desc Register New User
 * @route api/auth/register
 * @method post
 * @access public
 */
const Register = async(req, res) => {
    try {
       // Is user already exist
       let user = await User.findOne({ userEmail: req.body.userEmail })
       if( user ) {
        return res.status(400).json({ message: 'User already exist'});
       }

       // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hachedPassword = await bcrypt.hash(req.body.userPassword, salt)
       
      // Create new user and save it to DB
        const newUser = new User({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: hachedPassword,
        })
        await newUser.save();

      // Send a response to client
        res.status(201).json({ message: 'You registred successfully, please log in'});
    } catch (error) {
      res.status(200).json({ message: error.message });
    }
}

/**
 * @desc Login user
 * @route api/auth/login
 * @method post
 * @access public
 */
const Login = async(req, res) => {
    try{
       // Is user exist 
        let user = await User.findOne({ userEmail: req.body.userEmail});
        if(!user) {
         return res.status(404).json({ message: "Invalid email or password"});
        } 

       // check the password 
        let isPasswordMatched = await bcrypt.compare(req.body.userPassword, user.userPassword);
        if(!isPasswordMatched) {
         return res.status(404).json({ message: "Invalid email or password"});
        }

       // Send response to client
        res.status(200).json({ 
            _id: user._id,
            userName: user.userName,
            userEmail: user.userEmail
        });
    }catch (error) {
        res.status(500).json({ message: error.message})
    }
}


module.exports = {
    Register, 
    Login
}