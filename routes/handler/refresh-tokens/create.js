const { User, RefreshToken } = require('../../../models');
const validator = require('fastest-validator');
const v = new validator();

module.exports = async (req, res) => {
  const userId = req.body.user_id;
  const refreshToken = req.body.refresh_token;

  const schema = {
    user_id: 'number',
    refresh_token: 'string',
  };

  const validate = v.validate(req.body, schema);
  //! status 400 = bad request/parameter
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  const createdRefreshToken = await RefreshToken.create({
    token: refreshToken,
    user_id: userId,
  });

  return res
    .status(200)
    .json({ status: 'success', data: { id: createdRefreshToken.id } });
};
