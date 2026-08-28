import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  
  // 实验性功能
  experimental: {
    // 启用服务器组件
    serverActions: {
      bodySizeLimit: '10mb', // 限制上传文件大小
    },
  },
  
  // 图片配置
  images: {
    domains: ['localhost'],
    unoptimized: true, // Docker环境使用
  },
  
  // 环境变量
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Phoebe Museum',
  },
};

export default nextConfig;
