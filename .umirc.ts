import { defineConfig } from 'dumi';
const path = require('path');
export default defineConfig({
  title: 'react-doc',
  outputPath: 'docs-dist',
  base: '/react-doc/',
  publicPath: '/react-doc/',
  mode: 'site',
  logo: 'https://tva1.sinaimg.cn/large/008i3skNgy1grohfghpboj305k05kq2x.jpg',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  cssLoader: {
    modules: {
      localIdentName: '[local]--[hash:base64:5]',
      auto: /\.module\.\w+$/i,
    },
  },
  chainWebpack: (config, { webpack }) => {
    // config.resolve.alias.set('docs', path.resolve(__dirname,'./docs'));
    // console.log( config.toConfig());
  },
  alias: {
    docs: path.resolve(__dirname, './docs'),
    utils: path.resolve(__dirname, './docs/utils'),
    '@styles': path.resolve(__dirname, './docs/styles'),
  },
  extraPostCSSPlugins: [require('postcss-write-svg')()],
  favicon: 'https://tva1.sinaimg.cn/large/008i3skNgy1grohfghpboj305k05kq2x.jpg',
  dynamicImport: {},
  exportStatic: {},
  // more config: https://d.umijs.org/config
});
