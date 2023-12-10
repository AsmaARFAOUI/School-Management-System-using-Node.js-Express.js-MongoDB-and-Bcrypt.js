const { Class } = require('../models/class');

/**
 * @desc Create class
 * @route api/classes
 * @method post
 * @access public
 */
const CreateClass = async (req, res) => {
   try{
     const newClass = await Class.create(req.body);
     res.status(201).json(newClass);
   } catch(error) {
     res.status(500).json({ message: error.message});
   }
}

/**
 * @desc Get all classes
 * @route api/classes
 * @method get
 * @access public
 */
const GetAllClasses = async(req, res) => {
    try{
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
}

/**
 * @desc Get class by id
 * @route api/classes/:id
 * @method get
 * @access public
 */
const GetClassById = async (req, res) => {
    try {
      const searchedClass = await Class.findById(req.params.id);
      if(searchedClass){
       res.status(200).json(searchedClass)
      } else {
       res.status(404).json({ message: 'Message not found'})
      }
    } catch (error) {
      res.status(500).json({ message: error.message})  
    }
}

/**
 * @desc Update a class
 * @route api/classes/:id
 * @method put
 * @access public
 */
const UpdateClass = async(req, res) => {
    try{
      const searchedClass = Class.findById(req.params.id)
      if(searchedClass) {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, {
            $set: {
                nameOfClass: req.body.nameOfClass
            }
        }, {
          new: true
        })
        res.status(200).json(updatedClass);
      }else {
        res.status(404).json({ message: 'Class not found'});
      } 
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc Delete a class
 * @route api/classes/:id
 * @method delete
 * @access public
 */
const deleteClass = async(req, res) => {
   try {
    const searchedClass = await Class.findById(req.params.id);
    if(searchedClass) {
       await Class.findByIdAndDelete(req.params.id);
       res.status(200).json({ message: 'Class deleted successfully'});
    } else {
        res.status(404).json({ message: 'Class not found'});
    }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

module.exports = {
    CreateClass,
    GetAllClasses,
    GetClassById,
    UpdateClass,
    deleteClass
}