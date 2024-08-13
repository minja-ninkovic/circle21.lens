module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      "react-native-worklets-core/plugin",
      require.resolve("expo-router/babel"),
    ],
  };
};
