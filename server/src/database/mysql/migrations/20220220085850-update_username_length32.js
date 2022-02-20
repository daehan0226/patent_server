'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
     try {
       await queryInterface.changeColumn(
         'users',
         'name',
         {
           type: Sequelize.DataTypes.STRING(32),
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
        queryInterface.changeColumn(
          'users', 
          'name', 
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },{transaction})
      ])
    })
  }
};
