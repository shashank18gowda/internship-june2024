import express from "express";
const router = express.Router();
import initTeacherModel from "../../model/teacherModel.js";

import { send, setErrorResponseMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import bcrypt from "bcrypt";

import constants from "../../config/constants.js";

router.post("/", async (req, res) => {
  try {
    const { teacher_name, phone, email, password } = req.body;
    const teacherModel = await initTeacherModel();
    if (!teacher_name || teacher_name == "") {
      const updated_response = setErrorResponseMsg(
        RESPONSE.PARAMETER_IS_MANDATORY,
        "teacher_name "
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
    if (!password || password == "") {
      const updated_response = setErrorResponseMsg(
        RESPONSE.PARAMETER_IS_MANDATORY,
        "password"
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

    const existingEntryphone = await teacherModel.find({
      phone: phone,
      is_active: constants.STATE.ACTIVE,
    });

    if (existingEntryphone.length > 0) {
      const updated_response = setErrorResponseMsg(
        RESPONSE.ALREADY_EXIST,
        "Entry with this phone number"
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

    const encryptedPassword = await bcrypt.hash(password, process.env.TOKENKEY);

    await teacherModel.create({
      teacher_name: teacher_name,
      phone: phone,
      email: email,
      password: encryptedPassword,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err.stack);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
