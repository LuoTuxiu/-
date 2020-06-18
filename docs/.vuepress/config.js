module.exports = {
	title: '流年的前端技术博客',
	description:
		'流年的前端技术博客，专注于最新的互联网前沿前端技术，同时记录平时解决问题的笔记。',
	// keywords: '流年,前端技术博客，前端',
	// head: [
	// 	{
	// 		keypwds: '流年,前端技术博客，前端',
	// 	},
	// ],
	plugins: [
		'@vuepress/nprogress',
		'@vuepress/back-to-top',
		[
			require('./plugins/plugin-google-analytics'),
			{
				ga: 'UA-161394175-1', // UA-00000000-0
			},
		],
		// [
		// 	'@vuepress/google-analytics',
		// 	{
		// 		ga: 'UA-161394175-1', // UA-00000000-0
		// 	},
		// ],
	],
	themeConfig: {
		nav: [
			{
				text: 'Github',
				link: 'https://github.com/LuoTuxiu',
			},
		],
		sidebar: [
			{
				title: '前端',
				collapsable: false,
				path: '/front/',
				children: [
					'front/js/react-关于数据的范式化normalir与redux中的实践',
					'front/js/阻止浏览器回退的解决思路popstate',
					'front/网页速度优化实战',
					'front/js/面试题-手写冻结一个对象',
					'front/js/面试题-手写数组去重',
					'front/调试技巧',
					'front/如何禁止谷歌浏览器自动填充密码',
					'front/如何跨域取到response额外的的headers',
					'front/css/面试题-img等inline元素引发的底部间隙问题',
					'front/前端杂',
					'/front/css/',
				],
			},
			{
				title: '计算机基础',
				path: '/computer/',
				collapsable: false,
				children: [
					'/computer/',
					'computer/关于HTTP你需要掌握的',
					'computer/algorithm/快速排序',
					'computer/algorithm/链表反转',
					'computer/Git的使用',
				],
			},
			{
				title: '工具类',
				path: '/tools/',
				collapsable: false,
				children: [
					'/tools/',
					'tools/如何开启mac的三指拖移',
					'tools/sublime常用快捷键',
				],
			},
			{
				title: '其它',
				path: '/old/',
				collapsable: false,
				children: ['old/linux学习笔记'],
			},
		],
		// sidebar: {
		//   '/old/': ['' /* /foo/ */],
		//   '/computer/': ['' /* /foo/ */],
		//   '/front/': [''],
		//   '/': ['' /* / */]
		// }
	},
};
