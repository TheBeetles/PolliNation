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
};

export default nextConfig;
