import { defineConfig } from 'dumi';
const path = require('path')
export default defineConfig({
  title: 'react-three',
  outputPath: 'docs-dist',
  mode:'site',
  logo:'/logo.png',
  extraBabelPlugins:[
    [
      'import',
      {
        libraryName:'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ],
  cssLoader: {
    modules: {
      localIdentName: "[local]--[hash:base64:5]",
      auto: /\.module\.\w+$/i,
    },
  },
  chainWebpack:(config, { webpack })=>{
    // config.resolve.alias.set('docs', path.resolve(__dirname,'./docs'));
    // console.log( config.toConfig());

  },
  alias:{
    docs:path.resolve(__dirname,'./docs'),
    utils:path.resolve(__dirname,'./docs/utils'),
  }
  // more config: https://d.umijs.org/config
});
