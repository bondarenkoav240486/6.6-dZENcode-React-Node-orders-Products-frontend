// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// module.exports = {
//   webpackDevMiddleware: config => {
//     config.watchOptions = {
//       poll: 1000,
//       aggregateTimeout: 300,
//     };
//     return config;
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  /* config options here */
};

const webpackDevMiddleware = (config: Configuration) => {
  config.watchOptions = {
    poll: 1000,
    aggregateTimeout: 300,
  };
  return config;
};

module.exports = {
  ...nextConfig,
  webpackDevMiddleware,
};

export default nextConfig;
