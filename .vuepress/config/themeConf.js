const sidebar = require('./sidebar-auto.js');

module.exports = {
	navbar: true,
	editLinks: true,
	editLinkText: '在 GitHub 上编辑此页',
	lastUpdated: '更新于',
	sidebar,
	nav: [
		// 路由跳转根据的是md文件中的permalink属性
		// 可以使用loader来动态改变permalink属性, 添加prefix,参见loader.js
		// sidebar呢?
		{
			text: '前端基础',
			items: [
				{
					text: 'Javascript',
					link: '/2019-06-10-javascript-inheritance-1/'
				},
				{
					text: ' HTML/CSS',
					link: '/2019-06-05-css-specificity/'
				},
				// { text: '浏览器&&网络', link: '/1/' },
				// { text: 'Node', link: '/2019-06-02-koa-source-code-analysis/' },
				{
					text: '数据结构与算法',
					link: '/2019-09-13-leetcode-4-median-of-two-sorted-arrays/'
				}
			]
		},
		{
			text: '框架工具',
			items: [
				{
					text: 'React',
					link: '/2019-06-01-react-props-children/'
				},
				// {
				// 	text: 'Vue',
				// 	link: '//'
				// },
				{
					text: 'AngularJS',
					link: '/2019-07-13-build-your-own-angular-0-project-setup/'
				},
				// {
				// 	text: 'webpack',
				// 	link: '/2019-06-28-underscore-analysis-1/'
				// },
				{
					text: 'Underscore',
					link: '/2019-06-28-underscore-analysis-1/'
				},
				{
					text: '工具使用',
					link: '/2019-05-28-how-does-vue-cli-work/'
				}
			]
		},
		{
			text: '其他',
			items: [
				{
					text: '踩坑汇总',
					link: '/2019-06-24-async-function-Unexpected-identifier/'
				},
				{
					text: '杂谈',
					link: '/2019-05-30-just-do-it/'
				},
				{
					text: '编程范式&&设计模式',
					link: '/2019-06-25-rethinking-object-oriented/'
				}
				// {
				// 	text: '编译原理',
				// 	link: '//'
				// },
				// {
				// 	text: '操作系统',
				// 	link: '//'
				// }
			]
		}
	]
};
