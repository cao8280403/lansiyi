/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_order', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		orderId: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		create_user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		approval_user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		create_date: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		update_date: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		good_id: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		good_num: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 't_order',
		timestamps: false
	});
};
