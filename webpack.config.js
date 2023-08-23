// webpack.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js', // Your main entry point
  output: {
    filename: 'index.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  target: 'node', // Set the build target to Node.js environment
  externals: [nodeExternals()], // Exclude Node.js modules from bundling
  mode: 'none',
};
