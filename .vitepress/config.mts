import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'ZZULI.dev',
  description:
    '一份面向学生的开发学习路线图：明确方向，打好基础，学好开发如此简单。-- The Gift for beginners',
  cleanUrls: true,
  lastUpdated: true,
  srcDir: 'src',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    siteTitle: 'ZZULI<span>.dev</span>',
    nav: [
      { text: '起步', link: '/getting-started/introduction' },
      { text: '参与贡献', link: '/contributing/guide' },
      { text: '更多', link: '/more' },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zzuli-dev/learn',
        ariaLabel: 'GitHub',
      },
    ],
    sidebar: [
      {
        text: '起步',
        items: [
          {
            text: '简介',
            link: '/getting-started/introduction',
          },
          {
            text: '如何使用',
            link: '/getting-started/how-to-use',
          },
          {
            text: '开发者基础',
            link: '/getting-started/developer-basics',
          },
          {
            text: 'Computer Science',
            link: '/getting-started/computer-science',
          },
        ],
      },
      {
        text: '🚀 开发方向',
        collapsed: true,
        items: [
          { text: 'Frontend', link: '/directions/frontend' },
          { text: 'Backend', link: '/directions/backend' },
          { text: 'Full Stack', link: '/directions/full-stack' },
          { text: 'DevOps', link: '/directions/devops' },
          { text: 'Game Developer', link: '/directions/game-developer' },
          { text: 'Embedded', link: '/directions/embedded' },
          { text: 'Cyber Security', link: '/directions/cyber-security' },
        ],
      },
      {
        text: '🤖 AI & Data',
        collapsed: true,
        items: [
          { text: 'AI Engineer', link: '/ai-data/ai-engineer' },
          { text: 'AI Agents', link: '/ai-data/ai-agents' },
          { text: 'Data Science', link: '/ai-data/data-science' },
        ],
      },
      {
        text: '💻 编程语言',
        collapsed: true,
        items: [
          { text: 'Python', link: '/languages/python' },
          { text: 'JavaScript', link: '/languages/javascript' },
          { text: 'TypeScript', link: '/languages/typescript' },
          { text: 'Java', link: '/languages/java' },
          { text: 'C', link: '/languages/c' },
          { text: 'C++', link: '/languages/cpp' },
          { text: 'Go', link: '/languages/go' },
          { text: 'Rust', link: '/languages/rust' },
        ],
      },
      {
        text: '🧰 核心技能',
        collapsed: true,
        items: [
          { text: 'Git & GitHub', link: '/core-skills/git-github' },
          { text: 'Linux', link: '/core-skills/linux' },
          { text: 'SQL', link: '/core-skills/sql' },
          { text: 'HTTP', link: '/core-skills/http' },
          { text: 'Docker', link: '/core-skills/docker' },
          { text: 'Bash', link: '/core-skills/bash' },
          { text: 'HTML & CSS', link: '/core-skills/html-css' },
        ],
      },
      {
        text: '💼 求职准备',
        collapsed: true,
        items: [
          { text: '简历怎么写', link: '/career/resume' },
          { text: '面试准备', link: '/career/interview' },
          { text: '实习与校招', link: '/career/internship' },
          { text: '刷题指南', link: '/career/leetcode' },
        ],
      },
      {
        text: '📚 学习资料',
        collapsed: true,
        items: [
          { text: '书籍推荐', link: '/resources/books' },
          { text: '网站与课程', link: '/resources/websites' },
          { text: '工具清单', link: '/resources/tools' },
        ],
      },
      {
        text: '贡献与维护',
        items: [
          { text: '如何参与贡献', link: '/contributing/guide' },
          { text: '路线图维护规范', link: '/contributing/maintenance' },
        ],
      },
    ],
    outline: { label: '本页内容', level: [2, 3] },
    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
    },
    editLink: {
      pattern: 'https://github.com/zzuli-dev/learn/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
  },
})
