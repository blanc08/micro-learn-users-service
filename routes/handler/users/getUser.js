const User = require('../../../models/User');

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'profession', 'avatar'],
  });

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  return res.status(200).json({
    status: 'success',
    data: user,
  });
};
