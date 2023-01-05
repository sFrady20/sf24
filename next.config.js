const { resolve } = require("path");
const WindiCSS = require("windicss-webpack-plugin");

const config = {
  swcMinify: false,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  webpack: (config, {}) => {
    config.plugins.push(new WindiCSS());

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { dimensions: false, typescript: true },
        },
      ],
    });

    config.module.rules.push({
      test: /\.glsl$/i,
      issuer: /\.[jt]sx?$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

module.exports = config;
