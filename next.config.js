module.exports = {
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: '/tournaments/:slug*',
        destination: '/arena/:slug*', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
}
