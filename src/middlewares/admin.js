const auth = async (req, res, next) => {
  try {
    if (!req.user.is_admin) {
      throw new Error('Only Administrators have access to this resource');
    }
    next();
  } catch (error) {
    res.status(401).send({
      error: error.message,
    });
  }
};

module.exports = auth;
