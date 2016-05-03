module.exports = {
  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations:{
      directory: __dirname + '/migrations',
      tableName: 'divvy'
    }
  },
  development: {
    client: 'postgresql',
    connection: {
      database: 'divvy'
    },
    migrations:{
      directory: __dirname + '/migrations',
      tableName: 'divvy'
    },
    seeds:{
      directory:__dirname + '/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: {
      database: 'divvy-test',
      user:     'divvy',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations:{
      directory: __dirname + '/test/migrations',
      tableName: 'divvy-test'
    }
  }
};
