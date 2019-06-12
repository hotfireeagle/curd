const R = require("ramda");

module.exports = {
    /**
     * app.model.define的封装函数，其中schemaObj是schema函数所返回的对象
     * @param {Object} app : Egg实例对象
     * @param {String} tableName : 数据表名称
     * @param {Object} schemaObj : 数据表的字段集合对象
     * @param {Object} tableConfig : 数据表的配置信息
     */
    defineModel: function(app, tableName, schemaObj, tableConfig) {
        let tableRowObj = {};
        const operation = (value, key) => {
            if (R.is(Object, value) && value.type) {
                tableRowObj[key] = value;
            } else {
                tableRowObj[key] = {
                    type: value,
                    allowNull: true
                };
            }
        };
        R.forEachObjIndexed(operation, schemaObj);
    }
};