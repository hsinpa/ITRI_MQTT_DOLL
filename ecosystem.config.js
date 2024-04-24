module.exports = {
    script: "serve",
    env: {
      PM2_SERVE_PATH: './dist/',
      PM2_SERVE_PORT: 4546,
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPAGE: './dist/index.html'
    }
  }