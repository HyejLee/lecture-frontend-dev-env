module.exports = function myWebpackLoader(content) {
  console.log('my-webpack-loader');
  return content.replace('console.log(', 'alert(');
};
