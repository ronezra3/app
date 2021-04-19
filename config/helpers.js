var path = require('path');

var ROOT = path.resolve(__dirname, '..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function isCordova(platform) {
    return (platform === 'android' || platform === 'ios' || platform === 'windows');
}

function extractPlatform(args) {
    return args.find((arg) => arg === 'android' || arg === 'ios' || arg === 'windows');
}

exports.isCordova = isCordova;
exports.extractPlatform = extractPlatform;
exports.root = root;
