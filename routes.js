import express from "express";
import registerApiHandler from "./src/controllers/auth/apiHandler.js";
import studentApiHandler from "./src/controllers/student/apiHandler.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/authenticate", registerApiHandler);
  app.use("/api/student", studentApiHandler);
};

export default routes;
