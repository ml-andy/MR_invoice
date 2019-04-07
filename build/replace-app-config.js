const fs = require('fs');
const path = require('path');
const filePath = __dirname + '/../src/constant/config/config.prod.js';

module.exports = function({ from, to }) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(from, to);
    fs.writeFile(filePath, result, 'utf8', function (err, data) {
       if (err) return console.log(err);
    });
  });
}

