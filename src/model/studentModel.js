import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { v4 as uuidv4 } from "uuid";

const studentModel = {
  student_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  student_name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isactive: {
    type: Number,
    default: 1,
  },
  image: {
    type: [String],
    data: Buffer,
    
    required: true,
  },
  teacher_id: {
    type: Schema.Types.ObjectId,
    ref: "teacherData",
  },
}

let student = null;

const initstudentModel = async () => {
  try {
    if (student) return student;
    student = mongoose.model("student", studentModel);

    return student;
  } catch (err) {
    console.log("student model", err.message);
  }
};

export default initstudentModel;
