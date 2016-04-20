module.exports = {

  development:{
    client: 'pg',
    connnection:{
      host:'localhost',
      user:'blah',
      password:'blah',
      database: 'divvy'
    },
    pool: {
      min: 0,
      max: 7
    },
    migrations:{
      directory: __dirname + '/migrations'
    },
    seeds:{
      directory:__dirname + '/seeds'
    }
  }
}
