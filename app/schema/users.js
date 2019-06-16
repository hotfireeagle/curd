/**
 *  README: 这个app并不一定是Egg实例，但是在这个对象里面一定会有Sequelize对象
 */
module.exports = app => {
  const { STRING, TINYINT, DATE } = app.Sequelize;
  return {
    id: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
    },
    nickname: {
      type: STRING,
      allowNull: true,
    },
    sex: {
      type: STRING,
      allowNull: true,
    },
    admin: {
      type: TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    openid: {
      type: STRING(38),
      allowNull: true,
    },
    phone: {
      type: STRING(20),
      allowNull: true,
    },
    password: {
      type: STRING,
      allowNull: true,
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
    }
  };
};
