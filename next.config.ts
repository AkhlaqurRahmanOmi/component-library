import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better tree-shaking
  experimental: {
    optimizePackageImports: ['@/components', './components', './index'],
  },
  
  // Webpack optimizations for better bundle size
  webpack: (config, { dev, isServer }) => {
    // Enable tree-shaking in production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }
    
    // Optimize bundle splitting
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks?.cacheGroups,
        components: {
          name: 'components',
          test: /[\\/]components[\\/]/,
          chunks: 'all',
          priority: 10,
        },
      },
    };
    
    return config;
  },
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable static optimization
  output: 'standalone',
};

export default nextConfig;
