//delete ||true on next line to set to development
if (process.env.NODE_ENV === 'production' || true) {
  console.log('our enviro:', process.env.NODE_ENV)
  module.exports = require('./root.prod');
} else {
  console.log('our enviro:', process.env.NODE_ENV)
  module.exports = require('./root.dev');
}
