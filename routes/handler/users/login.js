const bycrypt = require('bcrypt');
const User = require('../../../models/User');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    email: 'email|empty:false',
    password: 'string|empty:false|min:6',
  };

  const validate = v.validate(req.body, schema);
  //* check validation
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  //* check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Invalid Email or Password' });
  }

  //* check if password is correct
  const isValidPassword = await bycrypt.compare(
    req.body.password,
    user.password,
  );

  if (!isValidPassword) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid Email or Password',
    });
  }

  res.json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profession: user.profession,
    },
  });
};
