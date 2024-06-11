import mongoose from "mongoose";
// const Schema = mongoose.Schema;
import { v4 as uuidv4 } from "uuid";

const teacherModel = {
  teacher_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  teacher_name: {
    type: String,
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
  password: {
    type: String,
    required: true,
  },
  is_active: {
    type: Number,
    default: 1,
  },
};

let teacher = null;

const initteacherModel = async () => {
  try {
    if (teacher) return teacher;
    teacher = mongoose.model("teacher", teacherModel);

    return teacher;
  } catch (err) {
    console.log("teacher model", err.message);
  }
};

export default initteacherModel;

// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// import { v4 as uuidv4 } from "uuid";

// const teacherModel = new Schema({
//   teacher_id: {
//     type: String,
//     default: uuidv4,
//     unique: true,
//   },
//   teacher_name: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isactive: {
//     type: Number,
//     default: 1,
//   },
// });

// export default mongoose.model("teacherModel", teacherModel);
