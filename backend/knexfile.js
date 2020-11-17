// Update with your config settings.

module.exports = {

  

 
  
    client: 'postgresql',
    connection: {
      database: 'school',
      user:     'postgres',
      password: '452016'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  

};
