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
    client: 'postgresql',
    connection: {
      database: 'divvy-test'
    },
    migrations:{
      directory: __dirname + '/migrations'
    }
  }
};
