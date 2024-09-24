/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'soyonlee-nextjs-demo-users-image.s3.ca-central-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig
