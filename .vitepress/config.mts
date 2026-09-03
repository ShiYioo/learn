import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'ZZULI.dev',
  description: '面向大学生开发者的学习路线图，从起步到实践逐步构建能力。',
  cleanUrls: true,
  lastUpdated: true,
  srcDir: 'src',
  themeConfig: {
    siteTitle: 'ZZULI<span>.dev</span>',
    nav: [
      { text: '关于', link: '/about/how-to-use' },
      { text: '参与贡献', link: '/about/contribution' },
      { text: '更多', link: '/about/more' },
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
        text: '关于路线图',
        items: [
          { text: '如何使用', link: '/about/how-to-use' },
          { text: '如何参与贡献', link: '/about/contribution' },
          { text: '路线图维护规范', link: '/about/maintenance' },
        ],
      },
      {
        text: '🎓 起步',
        items: [
          {
            text: '大学生开发者',
            link: '/getting-started/university-developer',
          },
          {
            text: 'Computer Science',
            link: '/getting-started/computer-science',
          },
        ],
      },
      {
        text: '🚀 开发方向',
        items: [
          { text: 'Frontend', link: '/directions/frontend' },
          { text: 'Backend', link: '/directions/backend' },
          { text: 'Full Stack', link: '/directions/full-stack' },
          { text: 'DevOps', link: '/directions/devops' },
          { text: 'Game Developer', link: '/directions/game-developer' },
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
