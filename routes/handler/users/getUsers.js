const User = require('../../../models/User');

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || [];

  const sqlOptions = {
    attributes: ['id', 'name', 'email', 'profession', 'avatar'],
  };

  if (userIds.length) {
    sqlOptions.where = { id: userIds };
  }

  const users = await User.findAll(sqlOptions);

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
