import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  i18n,
  webpackDevMiddleware: (config: Configuration) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;