const sidebar = require('./sidebar-auto.js')

module.exports = {
  navbar: true,
  editLinks: true,
  editLinkText: '在 GitHub 上编辑此页',
  lastUpdated: '更新于',
  sidebar,
  nav: [
    // 路由跳转根据的是md文件中的permalink属性
    // 可以使用loader来动态改变permalink属性, 添加prefix,参见loader.js
    {
      text: 'React',
      link: '/2019-06-01-react-props-children/',
    },
    {
      text: 'Vue',
      link: '/2020-04-14-differences-between-v-if-v-show/',
    },
    {
      text: 'Angular',
      link: '/2019-07-13-build-your-own-angular-0-project-setup/',
    },
    {
      text: 'Uniapp/小程序',
      link: '/2020-04-01-qq-miniprogram/',
    },
    {
      text: 'Javascript',
      link: '/2019-06-10-javascript-inheritance-1/',
    },

    {
      text: ' HTML/CSS',
      link: '/2019-06-05-css-specificity/',
    },
    {
      text: '前端算法',
      link: '/2019-09-13-leetcode-4-median-of-two-sorted-arrays/',
    },
    {
      text: 'Node/工具',
      link: '/2019-06-02-koa-source-code-analysis/',
    },
    {
      text: 'Github',
      link: 'https://github.com/chenxiaoyao6228',
    },
  ],
}
