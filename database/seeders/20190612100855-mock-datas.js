const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('users', [{
        uuid: uuid(),
        name: 'hahahai',
        admin: 1,
        openId: uuid(),
        phone: '15170307030',
        password: 'testpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    } catch (e) {
      console.error(e);
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
