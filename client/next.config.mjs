/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 'http://back-end:5000/api/:path*'
            },
        ]
    },
    reactStrictMode: false,
    webpackDevMiddleware: config => {
        config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
    }
    return config
  },
};

export default nextConfig;
