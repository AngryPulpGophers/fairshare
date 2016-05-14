if (process.env.NODE_ENV === 'production' || false) {
  console.log('our production enviro')
  module.exports = require('./configure-store.prod');
} else {
  console.log('our testing enviro');
  module.exports = require('./configure-store.dev');
}
