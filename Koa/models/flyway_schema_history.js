/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('flyway_schema_history', {
		installed_rank: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		version: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		description: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		type: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		script: {
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		checksum: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		installed_by: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		installed_on: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		execution_time: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		success: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		}
	}, {
		tableName: 'flyway_schema_history',
		timestamps: false
	});
};
