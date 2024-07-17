module.exports = {
    plugins: [
      require('autoprefixer'),
      // other plugins
      async (css) => {
        await process(css); // Ensure async plugins are correctly handled
      }
    ]
  };
  