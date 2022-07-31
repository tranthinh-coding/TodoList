const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'src/assets',
  pwa: {
    name: 'Todo List',
    manifestOptions: {
      background_color: '#070606'
    }
  }
});
