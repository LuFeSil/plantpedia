const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { i18n } = require('./next-i18next.config')

const config = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/png'],
  },
  i18n,
}

module.exports = withBundleAnalyzer(config)
