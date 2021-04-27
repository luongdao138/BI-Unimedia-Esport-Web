const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

const getBuildConfig = (...args) => {
  const path = require('path')
  const withPugins = require('next-compose-plugins')
  const withSCSS = require('@zeit/next-sass')
  const postcssPresetEnv = require('postcss-preset-env')
  const postcssPresetEnvOptions = {
    features: {
      'custom-media-queries': true,
      'custom-selectors': true,
    },
  }

  const cssOptions = {
    postcssLoaderOptions: {
      plugins: [postcssPresetEnv(postcssPresetEnvOptions)],
    },
    sassLoaderOptions: {
      includePaths: [path.join(process.cwd(), 'src', 'theme', 'globalcss')],
    },
  }

  const nextConfig = {}
  return withPugins([[withSCSS, cssOptions]], nextConfig)(...args)
}

module.exports = (phase, ...rest) => {
  const shouldAddBuildConfig =
    phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD
  return shouldAddBuildConfig ? getBuildConfig(phase, ...rest) : {}
}
