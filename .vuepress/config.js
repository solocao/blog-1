const { mdConf, themeConf, localesConf } = require('./config/');

module.exports = {
	locales: localesConf,
	markdown: mdConf,
	themeConfig: themeConf,
	plugins: [
		require('./plugins/my-router'), // 自定义路由跳转
		require('./plugins/my-loader'), // 自定义加载进度条
		require('vuepress-plugin-viewer'),
		['@vuepress/google-analytics', { ga: 'UA-153166274-1' }],
		'@vuepress/back-to-top',
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
					el: '#valine-vuepress-comment',
					appId: '1IcJJA5wop6jVJffiMFuPGjt-gzGzoHsz',
					appKey: '21rxl6azhPigIFteXAVKCsUo',
					placeholder: '评论多一点, bug少一点',
					repo: 'blog',
					path: '<%- frontmatter.commentid || frontmatter.permalink %>',
					avatar: 'wavatar',
					pageSize: 10,
					visitor: true
				}
			}
		]
	]
};
