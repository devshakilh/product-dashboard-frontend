import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'api.dicebear.com' },
      { hostname: 'Managment.lon1.digitaloceanspaces.com' },
      { hostname: 'example.com' },
      { hostname: 'placehold.co' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'js.stripe.com' },
    ],
    dangerouslyAllowSVG: true, // need to remove later
  },
};

export default withNextIntl(nextConfig);
