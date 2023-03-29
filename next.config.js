const WindiCSS = require("windicss-webpack-plugin");

const config = {
  experimental: {
    appDir: true,
  },
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

    //glsl code
    config.module.rules.push({
      test: /\.glsl$/i,
      issuer: /\.[jt]sx?$/,
      use: ["raw-loader", "glslify-loader"],
    });

    //txt loading (for ai prompts)
    config.module.rules.push({
      test: /\.txt$/i,
      issuer: /\.[jt]sx?$/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = config;
