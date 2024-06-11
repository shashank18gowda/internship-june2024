import express from "express";
const router = express.Router();
import initstudentModel from "../../model/studentModel.js";

import { send, setErrorResponseMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import imguploads from "../../middlewares/uploads.js";
import multer from "multer";
import authenticate from "../../middlewares/authenticate.js"
const uploads = imguploads.array("image", 80);

router.post("/", authenticate,async (req, res) => {
  try {
    uploads(req, res, async (err) => {
      // console.log(req.files);
      if (!req.files || req.files == "") {
        const updated_response = setErrorResponseMsg(
          RESPONSE.PARAMETER_IS_MANDATORY,
          "Image"
        );
        return send(res, updated_response);
      } else if (err instanceof multer.MulterError) {
        // console.log(err);
        return send(res, RESPONSE.FILE_SIZE);
      }
      if (err) {
        return send(res, RESPONSE.UNKNOWN_ERROR);
      }

      let filename = [];
      if (req.files != null) {
        req.files.forEach((ele) => {
          filename.push(ele.filename);
        });
      }
      const { student_name, phone, email, rollno } = req.body;
      const studentModel = await initstudentModel();

      if (!student_name || student_name == "") {
        const updated_response = setErrorResponseMsg(
          RESPONSE.PARAMETER_IS_MANDATORY,
          "student_name "
        );
        return send(res, updated_response);
      }

      if (!phone || phone == "") {
        const updated_response = setErrorResponseMsg(
          RESPONSE.PARAMETER_IS_MANDATORY,
          "phone"
        );
        return send(res, updated_response);
      }

      if (!email || email == "") {
        const updated_response = setErrorResponseMsg(
          RESPONSE.PARAMETER_IS_MANDATORY,
          "email"
        );
        return send(res, updated_response);
      }
      if (!rollno || rollno == "") {
        const updated_response = setErrorResponseMsg(
          RESPONSE.PARAMETER_IS_MANDATORY,
          "rollno"
        );
        return send(res, updated_response);
      }

      const isValidPhone =
        validator.isMobilePhone(phone) && phone.toString().length === 10;

      if (!isValidPhone == true) {
        const updated_response = setErrorResponseMsg(
          RESPONSE.INVALID_DATA,
          "phone number"
        );
        return send(res, updated_response);
      }

      if (email) {
        const isValidEmail = validator.isEmail(email);

        if (!isValidEmail) {
          const updated_response = setErrorResponseMsg(
            RESPONSE.INVALID_DATA,
            "email"
          );
          return send(res, updated_response);
        }
      }

      await studentModel.create({
        student_name: student_name,
        phone: phone,
        email: email,
        rollno: rollno,
        image: filename,  
        teacher_id: req.user.id,
      });
      return send(res, RESPONSE.SUCCESS);
    });
  } catch (err) {
    console.log(err.stack);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
