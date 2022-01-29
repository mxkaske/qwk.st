module.exports = {
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/_sites/:slug",
      },
    ];
  },
};
