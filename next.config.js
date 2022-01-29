module.exports = {
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/:slug",
        destination: "/_sites/:slug",
        permanent: true,
      },
    ];
  },
};
