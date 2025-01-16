import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  
  images: {
    
    remotePatterns: [
      {
        protocol: 'https', // السماح فقط بروابط HTTPS (لتجنب الصور غير الآمنة)
        hostname: '**', // السماح بأي نطاق أو دومين
      },
    ],
  },
};

export default nextConfig;
