'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Bagus',
          profession: 'Developer',
          role: 'admin',
          email: 'bagus@gmail.com',
          password: await bcrypt.hash('password', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'John Doe',
          profession: 'Developer',
          role: 'student',
          email: 'john@gmail.com',
          password: await bcrypt.hash('password', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
