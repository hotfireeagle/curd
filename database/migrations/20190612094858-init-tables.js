'use strict';
const fs = require('fs');
const path = require('path');

const SCHEMA_PATH = path.join(__dirname, '../../app/schema');

module.exports = {
  /** 创建所有表 */
  up: async (queryInterface, Sequelize) => {
    try {
      const files = fs.readdirSync(SCHEMA_PATH);
      files.map(async fileName => {
        if (fileName.endsWith('.js')) {
          const filePath = path.join(SCHEMA_PATH, fileName);
          const schema = require(filePath)({ Sequelize });
          const tableName = fileName.replace('.js', '');
          await queryInterface.createTable(tableName, schema);
        }
      });
    } catch (e) {
      console.error(e);
    }
  },

  /** 删除所有表 */
  down: async queryInterface => {
    await queryInterface.dropAllTables();
  },
};
