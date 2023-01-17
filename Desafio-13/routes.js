const getRoot = (req, res) => {
  res.render("products");
};

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    const { usuario, contraseña } = req.user;
    const user = { usuario, contraseña };
    res.render("logueado", { layout: "logueo", user });
  } else {
    res.render("login", { layout: "logueo" });
  }
};

const getSignup = (req, res) => {
  if (req.isAuthenticated()) {
    const { usuario, contraseña } = req.user;
    const user = { usuario, contraseña };
    res.render("logueado", { layout: "logueo", user });
  } else {
    res.render("signup", { layout: "logueo" });
  }
};

const postLogin = (req, res) => {
  const { usuario, contraseña } = req.user;
  const user = { usuario, contraseña };
  req.session.admin = true;
  res.render("logueado", { layout: "logueo", user });
};

const postSignup = (req, res) => {
  const { usuario, contraseña } = req.user;
  const user = { usuario, contraseña };
  res.render("logueado", { layout: "logueo", user });
};

const getLogout = (req, res) => {
  const { usuario, contraseña } = req.user;
  const user = { usuario, contraseña };
  res.render("logout", { layout: "logueo", user });
  req.logout();
};

const failRoute = (req, res) => {
  res.status(404).render("routingFail", {});
};

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getLogout,
  failRoute,
};
