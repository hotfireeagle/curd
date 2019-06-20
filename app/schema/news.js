'use strict';

module.exports = app => {
  const { STRING, DATE, TEXT } = app.Sequelize;

  return {
    id: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
    category: {
      type: STRING,
      allowNull: false,
    },
    created_at: {
      type: DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
  };
};
