const bycrypt = require('bcrypt');
const User = require('../../../models/User');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  //* Validate the request body
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    password: 'string|empty:false|min:6',
    profession: 'string|optional',
    avatar: 'string|optional',
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  //* check if user exist or not
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  //* check if email exists
  const email = req.body.email;
  if (email) {
    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail && email !== user.email) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Email already exists' });
    }
  }

  //* hash the password
  const password = await bycrypt.hash(req.body.password, 10);
  const { name, profession, avatar } = req.body;
  await User.update({
    name,
    email,
    password,
    profession,
    avatar,
  });

  return res.status(200).json({
    status: 'success',
    data: { id: user.id, name, email, profession, avatar },
    message: 'User updated successfully',
  });
};
