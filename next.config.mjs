/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["webpack-glsl-loader"],
    });

    return config;
  },
};

export default nextConfig;
