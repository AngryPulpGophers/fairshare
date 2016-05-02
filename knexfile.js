module.exports = {
  production: {
    client: 'postgres',
    connection: {
      host: 'pellefant-02.db.elephantsql.com',
      database: 'pllapgon',
      user: 'pllapgon',
      password: '68qTi8Qfaq6fmK5q2jPKW9XWtgAc7Pws',
      port: 5432
    },
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
