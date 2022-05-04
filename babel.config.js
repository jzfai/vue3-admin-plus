module.exports = {
  //change esm to require
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript']
}
