import jwt from "jsonwebtoken";
import { send } from "../helper/responseHelper.js";
import {RESPONSE} from "../config/global.js";

const authenticate = (req, res, next) => {
  const token = req.headers["access-token"];

  if (!token) {
    return send(res, RESPONSE.ACCESS_DENIED);
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKENKEY);
    req.user = decoded;
  } catch (err) {
    // console.log(err);
    return send(res, RESPONSE.INVALID_TOKEN);
  }
  return next();
};

export default authenticate;
