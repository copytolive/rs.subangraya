/** @type {import('next').NextConfig} */
const isGithub = process.env.GITHUB_ACTIONS === 'true'
const basePath = isGithub ? '/rs.subangraya' : ''

module.exports = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
}
