/**
 *  README: 这个app并不一定是Egg 实例，但是在这个对象里面一定会有Sequelize对象
 */
module.exports = app => {
    const { STRING, UUIDV4, BOOLEAN, DATE } = app.Sequelize;
    return {
        uuid: {
            type: STRING(38),
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name: {
            type: STRING,
            allowNull: false
        },
        admin: {
            type: BOOLEAN,
            allowNull: true,
            defaultValue: false 
        },
        openId: {
            type: STRING(38),
            allowNull: false
        },
        phone: {
            type: STRING(20),
            allowNull: true
        },
        password: {
            type: STRING,
            allowNull: true
        },
        createdAt: {
            type: DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DATE,
            allowNull: true,
            defaultValue: new Date()
        }
    };
}