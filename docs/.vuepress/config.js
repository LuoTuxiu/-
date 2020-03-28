module.exports = {
  title: '前端技术博客',
  description: '骆图秀，笔记，前端，技术博客',
  themeConfig: {
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/LuoTuxiu'
      }
    ],
    sidebar: [
      {
        title: '前端',
        collapsable: false,
        path: '/front/',
        children: [
          '/front/css/',
          'front/调试技巧',
          'front/如何禁止谷歌浏览器自动填充密码'
        ]
      },
      {
        title: '其它',
        path: '/old/',
        children: ['/old/', 'old/linux学习笔记']
      },
      {
        title: '工具类',
        path: '/tools/',
        children: ['/tools/', 'tools/如何开启mac的三指拖移']
      }
    ]
    // sidebar: {
    //   '/old/': ['' /* /foo/ */],
    //   '/computer/': ['' /* /foo/ */],
    //   '/front/': [''],
    //   '/': ['' /* / */]
    // }
  }
};
