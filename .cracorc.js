const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = () => ({
  webpack: {
    configure: {
      output: {
        publicPath: "http://localhost:9001/",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "child",
          filename: "remoteEntry.js",
          exposes: {
            "./App": "./src/App",
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
});