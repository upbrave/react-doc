export default {
  ssr: {},
  hash: true,
  title: 'fe-doc',
  mode: 'site',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  scripts: ['https://v1.cnzz.com/z_stat.php?id=1278653578&web_id=1278653578'],
  analytics: {
    ga: 'UA-128069695-2',
  },
  styles: ['a[title=站长统计] { display: none; }'],
  exportStatic: {},
  sitemap: {
    hostname: 'https://d.umijs.org',
  },
};
