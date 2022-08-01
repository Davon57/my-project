/* eslint-disable */
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    // devServer: {
    //     host: '127.0.0.0',
    //     post: 5008,
    //     client: {
    //         webSocketURL: 'ws://127.0.0.0:5008/ws',
    //     }
    // },
    transpileDependencies: true,
    lintOnSave: false
})