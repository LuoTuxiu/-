const fs = require('fs');

const BLOG_FILES_DIR_PATH = 'docs';

const dirsNames = {
	tools: '工具类',
	front: '前端',
	computer: '计算机基础',
	old: '其它',
};

const generateSidebarData = () => {
	let sidebar = [];
	const dirs = fs
		.readdirSync(BLOG_FILES_DIR_PATH)
		.filter((item) => item.indexOf('.') === -1);
	sidebar = dirs.map((item) => {
		const children = fs
			.readdirSync(`${BLOG_FILES_DIR_PATH}/${item}`, { withFileTypes: true })
			.filter((dirent) => !dirent.isDirectory())
			.filter((obj) => obj.name.indexOf('README') === -1)
			.filter((obj) => /.*\.md$/gi.test(obj.name));
		return {
			title: dirsNames[item],
			collapsable: false,
			path: `/${item}/`,
			children: children.map((obj) => `${item}/${obj.name.replace('.md', '')}`),
		};
	});
	console.log(sidebar);
	return sidebar;
};

generateSidebarData();

module.exports = {
	generateSidebarData,
};
