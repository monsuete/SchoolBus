exports.up = function (knex, Promise) {
  return knex.schema.createTable('empresa', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('about').notNull()
    table.string('instruction').notNull()
    table.string('latitude').notNull()
    table.string('longitude').notNull()
    table.string('telefone').notNull()
    table.integer('permissao').notNull()
    table.string('data_permissao').notNull()
    table.integer('idCidade').references('id')
      .inTable('cidade').notNull()

  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('empresa')
};