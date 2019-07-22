module.exports = {
    base: '/tmsAdminDoc/',
    title: '教学管理系统',
    description: '教学管理系统公共组件文档',
    dest: 'tmsAdminDoc',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/views/basic/' },
            { text: '高级', link: '/views/advance/' },
            { text: '项目GitHub', link: 'https://github.com/pp-jifangli/project-tms-admin.git' },
            { text: '文档GitHub', link: 'https://github.com/pp-jifangli/project-tms-admin-doc.git' },
        ],
        sidebar: {
            '/views/basic/': [
                {
                collapsable: false,
                children: [
                    '',
                    'emaoUI'
                ]
                }
            ],
            '/views/advance/': [
                {
                    title: '高级',
                    collapsable: false,
                    children: [
                        '',
                        'api',
                        'router',
                        'filter',
                        'permission',
                        'directive',
                        'component',
                        'mixin',
                        'utils',
                        'storage',
                        'icon',
                        'style',
                    ]
                },
                {
                    title: '进阶',
                    collapsable: false,
                    children: [
                        'vuex',
                        'plugin',
                        'theme',
                        'mock',
                    ]
                },
                {
                    title: '其他',
                    collapsable: false,
                    children: [
                        'other',
                        'version'
                    ]
                }
            ],
            '/': [
                ''
            ]
        }
    }
}