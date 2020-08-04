const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
  plugins: [
    {
      plugin: reactHotReloadPlugin,
    },
    // Enable React-🔥-Dom - see https://github.com/gaearon/react-hot-loader#react--dom
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig, context: { env, paths } }) => {
          webpackConfig.resolve.alias['react-dom'] = '@hot-loader/react-dom'

          return webpackConfig
        },
      },
    },
    {
      plugin: new MomentLocalesPlugin({
        localesToKeep: ['ru'],
      }),
    },
  ],
}
