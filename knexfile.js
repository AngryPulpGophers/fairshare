module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'divvy'
    },
    migrations:{
      directory: __dirname + '/migrations'
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
      directory: __dirname + '/test/migrations'
    }
  }
};
