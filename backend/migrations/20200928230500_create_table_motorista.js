
exports.up = function (knex, promise) {
    return knex.schema.createTable('motorista', table => {
        table.increments('id').primary()
        table.string('name').notNull()

    })
};

exports.down = function (knex, promise) {
    return knex.schema.dropTable('motorista')
};
