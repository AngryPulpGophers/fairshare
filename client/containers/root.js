if (process.env.NODE_ENV === 'production') {
  console.log('our enviro:', process.env.NODE_ENV)
  module.exports = require('./root.prod');
} else {
  console.log('our enviro:', process.env.NODE_ENV)
  module.exports = require('./root.dev');
}
