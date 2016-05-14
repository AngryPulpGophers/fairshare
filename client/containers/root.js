//delete ||true on next line to set to development
if (process.env.NODE_ENV === 'production' || true) {
  console.log('our production enviro');
  module.exports = require('./root.prod');
} else {
  console.log('our development enviro');
  module.exports = require('./root.dev');
}
