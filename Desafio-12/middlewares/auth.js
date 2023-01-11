// VERIFICACION
const auth = (req, res, next) => {
  if (req.session && req.session?.admin) {
    return next();
  } else {
    return res.render("noAutorizado", {
      layout: "logueo",
      admin: req.session.admin,
    });
  }
};

module.exports = auth;
