/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // GitHub Pagesのサブディレクトリ配下でもパスが通るように設定
    basePath: '/AxelOn-Sagi-Simulator',
    assetPrefix: '/AxelOn-Sagi-Simulator/',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
