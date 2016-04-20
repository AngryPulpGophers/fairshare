module.exports = {

  development:{
    client: 'postgresql',
    connnection:{
      host:'127.0.0.1',
      database: 'divvy'
    },
    migrations:{
      directory: __dirname + '/migrations'
    }
    seeds:{}
  }
}
