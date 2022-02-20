'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
     try {
       await queryInterface.addColumn(
         'users',
         'password',
         {
           type: Sequelize.DataTypes.STRING(64),
           allowNull: false,
           validate: {
             is: /^[0-9a-f]{64}$/i
           }
         },
         { transaction }
       );
 
       await transaction.commit();
     } catch (err) {
       await transaction.rollback();
       throw err;
     }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction( transaction => {
      return Promise.all([
        queryInterface.removeColumn(
          'users', 
          'password',
          {transaction})
      ])
    })
  }
};
