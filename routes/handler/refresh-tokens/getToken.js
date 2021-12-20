const { RefreshToken } = require('../../../models');
const validator = require('fastest-validator');
const v = new validator();

module.exports = async (req, res) => {
  const refreshToken = req.query.refresh_token;

  const token = await RefreshToken.findOne({
    where: { token: refreshToken },
  });

  if (!token) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Refresh token is invalid' });
  }

  return res.status(200).json({
    status: 'success',
    data: token,
  });
};
