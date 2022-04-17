module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ["@babel/plugin-proposal-export-namespace-from", 'babel-preset-expo'],
    presets: [
        "module:metro-react-native-babel-preset",
        "@babel/preset-typescript",
    ],
  };
};
