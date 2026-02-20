/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // GitHub Pagesのサブディレクトリ配下でもパスが通るように設定
    // リポジトリ名変更に合わせて修正: AxelOn-Sagi-Ultimate
    basePath: '/AxelOn-Sagi-Ultimate',
    assetPrefix: '/AxelOn-Sagi-Ultimate/',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
