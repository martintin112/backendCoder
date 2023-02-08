const express = require("express");
const { Router } = express;
const routerProcess = Router();
const { fork } = require("child_process");
const getInfoProcess = require("./utils/info.js");
const log4js = require("log4js");

log4js.configure({
  appenders: {
    consoleLogger: { type: "console" },
    warnLogger: { type: "file", filename: "warn.log" },
    errorLogger: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["consoleLogger"], level: "info" },
    warnFile: { appenders: ["warnLogger", "consoleLogger"], level: "warn" },
    errorFile: { appenders: ["errorLogger", "consoleLogger"], level: "error" },
  },
});

let logger = log4js.getLogger();

function getRoot(req, res) {
  logger.info("path: / , Method: GET");
  res.render("products");
}

function getLogin(req, res) {
  logger.info("path: /login , Method: GET");
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("logueado", { layout: "logueo", user });
  } else {
    res.render("login", { layout: "sinChat" });
  }
}

function getSignup(req, res) {
  logger.info("path: /signup , Method: GET");
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("logueado", { layout: "logueo", user });
  } else {
    res.render("signup", { layout: "sinChat" });
  }
}

function postLogin(req, res) {
  logger.info("path: /login , Method: POST");
  const { username, password } = req.user;
  const user = { username, password };
  req.session.admin = true;
  res.render("logueado", { layout: "logueo", user });
}

function postSignup(req, res) {
  logger.info("path: /signup , Method: POST");
  const { username, password } = req.user;
  const user = { username, password };
  res.render("logueado", { layout: "logueo", user });
}

function getLogout(req, res) {
  logger.info("path: /logout , Method: GET");
  const { username, password } = req.user;
  const user = { username, password };
  res.render("logout", { layout: "logueo", user });
  req.logout();
}

function failRoute(req, res) {
  logger = log4js.getLogger("warnFile");
  logger.warn("Esta ruta no existe");
  res.status(404).render("routingFail", { layout: "sinChat" });
}

function signupFail(req, res) {
  logger = log4js.getLogger("errorFile");
  logger.error("Error de registro, intente nuevamente");
  res.render("signupFail", { layout: "logueo" });
}

function loginFail(req, res) {
  logger = log4js.getLogger("errorFile");
  logger.error("Error al iniciar sesion, intente nuevamente");
  res.render("loginFail", { layout: "logueo" });
}

routerProcess.get("/info", async (req, res) => {
  logger.info("path: /info , Method: GET");
  res.render("info", getInfoProcess());
});

routerProcess.get("/api/randoms", async (req, res) => {
  logger.info("path: /api/randoms , Method: GET");
  const { cant } = req.query;
  const calculo = fork("./utils/suma.js");
  calculo.send(cant || 100000000);
  calculo.on("message", (obj) => {
    res.render("random", { layout: "sinChat", object: obj });
  });
});

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getLogout,
  failRoute,
  signupFail,
  loginFail,
  routerProcess,
};
