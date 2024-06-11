import express from "express";
import registerApiHandler from "./src/controllers/auth/apiHandler.js";
import studentApiHandler from "./src/controllers/student/apiHandler.js"
// import userApiHandler from "./src/controllers/user/apiHandler.js"
// import buyerApiHandler from "./src/controllers/buyer/apiHandler.js"

const routes = (app) => {
  app.use(express.json());
  app.use("/api/authenticate", registerApiHandler);
    app.use("/api/student", studentApiHandler);
  //   app.use("/api/user", userApiHandler);
  //   app.use("/api/buyer", buyerApiHandler);
};

export default routes;
