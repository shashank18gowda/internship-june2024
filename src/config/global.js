export const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected.",
  },

  UNKNOWN_ERROR: {
    code: 500,
    message: "Something went wrong, Please try again!",
  },

  NOT_MATCH: {
    code: 201,
    message: "Given data is not match.",
  },
  PARAMETER_IS_MANDATORY: {
    code: 202,
    message: "is mandatory parameter.",
  },
  FILE_SIZE: {
    code: 203,
    message: "File size should be in less then 2MB",
  },

  ALREADY_EXIST: {
    code: 204,
    message: "Already exists",
  },
  INVALID_DATA: {
    code: 205,
    message: "is invalid.",
  },

  NOT_FOUND: {
    code: 206,
    message: "Not found",
  },

  INVALID_TOKEN: {
    code: 400,
    message: "Invalid token",
  },

  ACCESS_DENIED: {
    code: 401,
    message: "Access denied. Unauthorized user",
  },
};
