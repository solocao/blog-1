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
      text: ' HTML/CSS',
      link: '/2019-06-05-css-specificity/',
    },
    {
      text: 'Javascript',
      link: '/2019-06-10-javascript-inheritance-1/',
    },
    {
      text: '前端框架',
      link: '/2019-07-11-build-your-own-angular-0-project-setup/',
    },
    {
      text: '网络与浏览器',
      link: '/2020-12-12-dns/',
    },
    {
      text: 'Node/前端工程化',
      link: '/2019-06-02-koa-source-code-analysis/',
    },
    {
      text: '面试题集合',
      link: '/2020-12-09-promise-light-problem/',
    },
    {
      text: '计算机基础',
      link: '/2019-09-13-leetcode-4-median-of-two-sorted-arrays/',
    },
    {
      text: 'Github',
      link: 'https://github.com/chenxiaoyao6228',
    },
  ],
}
