import { Router } from "express";
import { send, setErrorResponseMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import initTeacherModel from "../../model/teacherModel.js";
import bcrypt from "bcrypt";
import constants from "../../config/constants.js";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const teacherModel = await initTeacherModel();
    const { email, password } = req.body;

    if (!email || email == "") {
      const updated_response = setErrorResponseMsg(
        RESPONSE.PARAMETER_IS_MANDATORY,
        "Email"
      );
      return send(res, updated_response);
    }
    if (!password || password == "") {
      const updated_response = setErrorResponseMsg(
        RESPONSE.PARAMETER_IS_MANDATORY,
        "Password"
      );
      return send(res, updated_response);
    }

    const teacher = await teacherModel.findOne({
      is_active: constants.STATE.ACTIVE,
      email: email,
    });

    if (teacher && (await bcrypt.compare(password, teacher.password))) {
      const token = jwt.sign(
        {
          id: teacher._id,
          name: teacher.teacher_name,
        },
        process.env.TOKENKEY
      );
      return send(res, RESPONSE.SUCCESS, { access_token: token });
    } else {
      const updateResponse = setErrorResponseMsg(
        RESPONSE.INVALID_DATA,
        "Login credentials"
      );
      return send(res, updateResponse);
    }
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
