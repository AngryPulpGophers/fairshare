module.exports = {
  development: {
    client: 'postgresql',
    connection:{
      database: 'divvy'
    },
    migrations:{
      directory: __dirname + '/migrations'
    },
    seeds:{
      directory:__dirname + '/seeds'
    }
  }
};
