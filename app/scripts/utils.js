
var utils = {
  wait(time) {
    return new Promise((resovle) => {
      setTimeout(resovle, time);
    });
  },
};

utils.path = require('path');

export default utils;

