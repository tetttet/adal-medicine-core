import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // images
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "cdn.anatoliahospital.com",
      "plus.unsplash.com",
      "www.gravatar.com",
      "api.uifaces.co",
      "randomuser.me",
      "raw.githubusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
