module.exports = function(sequelize, DataTypes) {
	var todo = sequelize.define('todo', {
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		style: DataTypes.STRING,
		color: DataTypes.STRING,
		count: DataTypes.INTEGER
	}, {
		classMethods: {
			insertTodos: function(body, id) {
				return new Promise(function(resolve, reject) {
					todo.bulkCreate(body).then(function() {
						return todo.destroy({
							where: {
								userId: id
							}
						});
					}).then(function() {
						return todo.update({
							userId: id
						}, {
							where: {
								userId: {
									$or: {
										$lt: 1,
										$eq: null
									}
								},
								count: {
									$between: [1, 4]
								}
							}
						});
					}).then(function() {
						return todo.destroy({
							where: {
								userId: {
									$or: {
										$lt: 1,
										$eq: null
									}
								}
							}
						});
					}).then(function() {
						return resolve();
					}).catch(function(e) {
						return reject();
					});
				});
			}
		},
	});
	return todo;
};