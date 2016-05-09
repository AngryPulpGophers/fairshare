var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var origJs = require.extensions['.js'];


// jsx compiler

require.extensions['.js'] = function (module, fileName) {
  var output;
  if (fileName.indexOf('node_modules/react/Libraries/react/react.js') >= 0) {
    fileName = path.resolve('./client_tests/mocks/react.js');
  }
  if (fileName.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, fileName);
  }
  var src = fs.readFileSync(fileName, 'utf8');
  output = babel.transform(src, {
    filename: fileName
  }).code;

  return module._compile(output, fileName);
};