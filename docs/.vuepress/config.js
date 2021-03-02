// import {generateSidebarData} from './tools'
const { generateSidebarData } = require('../../build');

const sidebar = generateSidebarData();

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
		sidebar,
		// sidebar: {
		//   '/old/': ['' /* /foo/ */],
		//   '/computer/': ['' /* /foo/ */],
		//   '/front/': [''],
		//   '/': ['' /* / */]
		// }
	},
};
