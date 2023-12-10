const { Class } = require('../models/class');
const { Student } = require('../models/student');


/**
 * @desc Create a student
 * @router api/students
 * @method post
 * @access public
 */
const CreateStudent = async (req, res) => {
   try {
     const newStudent =  await Student.create(req.body);
     res.status(201).json(newStudent);
   } catch (error) {
     res.status(500).json({ error: error.message });
   } 
}

/**
 * @desc Get all students
 * @router api/students
 * @method get
 * @access public
 */
const GetAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}

/**
 * @desc Get student by id
 * @router api/students/:id
 * @method get
 * @access public
 */
const GetStudentById = async(req, res) => {
 try {
   const student = await Student.findById(req.params.id)
   if(student){
    res.status(200).json(student);
   }else {
    res.status(404).json({ message: 'Student not found'})
   }
 } catch (error) {
   res.status(500).json({ error: error.message })
 }
}

/**
 * @desc Update a student
 * @router api/students/:id
 * @method put
 * @access public
 */
const UpdateStudent = async(req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if(student) {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, {
        $set: {
          studentName: req.body.studentName,
          studentBirthday: req.body.studentBirthday,
          studentPhone: req.body.studentPhone
        }
      },{
        new: true
      });
      res.status(200).json(updatedStudent);
    }else {
      res.status(404).json({ message: 'Student not found'})
    }
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}

/**
 * @desc Delete a student
 * @router api/students/:id
 * @method delete
 * @access public
 */
const DeleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if(student){
      await Student.findByIdAndDelete( req.params.id );
      res.status(200).json({ message: 'Student deleted successfully'});
    }else {
      res.status(404).json({ message: 'Student not found'})
    }
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}

/**
 * @desc Add Student To A Class
 * @route api/students/:studentId/:classId
 * @method post
 * @access public
 */
const AddStudentToClass = async(req, res) => {
  try {
    const searchedStudent = await Student.findById(req.params.studentId);
    let searchedClass;
    if(searchedStudent) {
       searchedClass = await Class.findById(req.params.classId);
       if(searchedClass) {
        const isExist = searchedClass.students.findById(req.params.studentId);
         if(isExist) {
          res.status(200).json({ message: 'Student already exist in this class'})
         }else {
          searchedClass = await Class.findByIdAndUpdate(req.params.classId, {
           $push: {
            students: searchedStudent
           }
      }, {
        new: true
      });
      await searchedClass.save();
      res.status(200).json(searchedClass)
         }
      }else {
      res.status(404).json({ message: 'Class not found'});
    }
    }else {
      res.status(404).json({ message: 'Student not found'});
    } 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * @desc Remove Student From Class
 * @router api/students/:studentId/:classId
 * @method Delete
 * @access public
 */
const RemoveStudentFromClass = async(req, res) => {
   try {
      let searchedStudent = await Student.findById(req.params.studentId);
      if(searchedStudent) {
        let searchedClass = await Class.findById(req.params.classId);
        if(searchedClass) {
          index = searchedClass.students.findIndex(student =>  student._id.equals(searchedStudent._id));
          searchedClass.students.splice(index, 1);
          await searchedClass.save();
          res.status(200).json({ message: 'Student deleted from class successfully'});
        }else {
         res.status(404).json({ message: 'Class not found' }); 
        }
      }else {
        res.status(404).json({ message: 'Student not found' });
      }
   } catch (error) {
      res.status(500).json({ message: message.error });
   }
}

module.exports = {
  CreateStudent, 
  GetAllStudents,
  GetStudentById,
  UpdateStudent,
  DeleteStudent,
  AddStudentToClass,
  RemoveStudentFromClass
}