// VERIFICACION
const auth = (req, res, next) => {
  if (req.session && req.session?.admin) {
    return next();
  } else {
    return res.render("noAutorizado", { layout: "logueo" });
  }
};

module.exports = auth;
