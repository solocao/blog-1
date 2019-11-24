const { mdConf, themeConf, localesConf } = require('./config/');

module.exports = {
	locales: localesConf,
	markdown: mdConf,
	themeConfig: themeConf,
	plugins: [
		require('./plugins/my-router'),
		require('./plugins/my-loader'),
		require('vuepress-plugin-viewer'),
		'@vuepress/back-to-top',
		['@vuepress/google-analytics', { ga: 'UA-153166274-1' }],
		[
			'@vuepress/pwa',
			{
				serviceWorker: true,
				updatePopup: {
					message: '发现页面有新内容',
					buttonText: '刷新'
				}
			}
		],
		[
			'vuepress-plugin-comment', // https://valine.js.org/configuration.html
			{
				choosen: 'valine',
				options: {
					appId: '1IcJJA5wop6jVJffiMFuPGjt-gzGzoHsz',
					appKey: process.env.appKey || '',
					placeholder: '评论多一点, bug少一点',
					repo: 'blog',
					path: 'window.loaction.pathname',
					avatar: 'wavatar',
					pageSize: 10,
					visitor: true,
					serverURLs: 'blog.chenxiaoyao.cn'
				}
			}
		]
	]
};
