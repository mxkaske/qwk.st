module.exports = {
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
  },
  // rewrites username slugs to their respective site
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/_sites/:slug",
      },
    ];
  },
};
