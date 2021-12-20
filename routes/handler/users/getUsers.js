const User = require('../../../models/User');

module.exports = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'profession', 'avatar'],
  });

  if (!users) {
    return res
      .status(404)
      .json({ status: 'error', message: 'There is no user now' });
  }

  return res.status(200).json({
    status: 'success',
    data: users,
  });
};
