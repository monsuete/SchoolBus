exports.up = function (knex, promise) {
  return knex.schema.createTable('vehicle', table => {
    table.increments('id').primary()
    table.string('placa').notNull()
    table.string('veiculo').notNull()
    table.integer('idEmpresa').references('id')
      .inTable('empresa').notNull()
    table.integer('idMotorista').references('id')
      .inTable('motorista').notNull()
  })
};

exports.down = function (knex, promise) {
  return knex.schema.dropTable('vehicle')
};
