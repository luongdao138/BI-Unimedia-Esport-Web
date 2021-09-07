const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  /* bydefault config  option Read For More Optios
  here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/
  cssModules: true,
})

module.exports = {
  future: {
    webpack5: true,
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'src/containers/VideoPlayer'),
      path.join(__dirname, 'src/styles/globalcss'),
      path.join(__dirname, 'node_modules/video.js'),
    ],
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
