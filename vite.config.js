const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        post_detail: resolve(__dirname, 'post-detail.html'),
        post_edit: resolve(__dirname, 'post-edit-post.html')
      }
    }
  }
})