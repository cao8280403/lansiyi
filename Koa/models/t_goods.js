/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_goods', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		total_num: {
			type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
			allowNull: true
		},
		residue_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		min_inventory: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		addNumber: {
			type: DataTypes.INTEGER(255),
			allowNull: true
		},
		outNumber: {
			type: DataTypes.INTEGER(255),
			allowNull: true
		},
		productType: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		type: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		img: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 't_goods',
		timestamps: false
	});
};
