module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    }
  }
}
