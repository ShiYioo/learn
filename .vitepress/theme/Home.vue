<script setup lang="ts">
import { withBase } from 'vitepress'
import VPNav from 'vitepress/dist/client/theme-default/components/VPNav.vue'

const routes = [
  {
    title: '起步',
    detail: '从大学生活与计算机基础开始。',
    link: '/getting-started/introduction',
  },
  {
    title: '开发方向',
    detail: '探索不同领域，找到适合自己的方向。',
    link: '/directions/frontend',
  },
  {
    title: 'AI & Data',
    detail: '理解智能应用与数据驱动的能力。',
    link: '/ai-data/ai-engineer',
  },
  {
    title: '编程语言',
    detail: '掌握主流语言，打牢表达与实现的基础。',
    link: '/languages/python',
  },
  {
    title: '核心技能',
    detail: '建立协作、部署与工程化的通用能力。',
    link: '/core-skills/git-github',
  },
  {
    title: '关于路线图',
    detail: '了解它如何被使用、维护与共同完善。',
    link: '/about/how-to-use',
  },
]
</script>

<template>
  <div class="zz-home">
    <VPNav />
    <main>
      <section class="zz-hero" aria-labelledby="home-title">
        <div class="zz-hero-copy">
          <h1 id="home-title">从 0 到 1 的 <br/> CS 学习指南</h1><span style="padding:2px 8px;font-size:12px;color:#b45309;background:#fef3c7;border-radius:999px;">🚧 施工中 9.4 开始</span>
          <p class="zz-hero-summary">一份面向学生的开发学习路线图：明确方向，打好基础，学好开发如此简单。-- The Gift for beginners</p>
          <div class="zz-hero-actions">
            <a class="zz-primary-action" :href="withBase('/getting-started/introduction')">开始探索</a>
            <a
              class="zz-github-action"
              href="https://github.com/zzuli-dev/learn"
              target="_blank"
              rel="noreferrer"
            >
              <span class="vpi-social-github" style="--icon: url('https://api.iconify.design/simple-icons/github.svg');"></span>
              GitHub
            </a>
          </div>
        </div>
        <figure class="zz-hero-figure">
          <img :src="withBase('/lum/lum-standing-small.png')" alt="Lum 拿着学习路线图与笔记本，准备开始探索" width="480" height="720">
        </figure>
      </section>

      <section class="zz-route-index" aria-label="学习路线索引">
        <a v-for="route in routes" :key="route.link" class="zz-route-link" :href="withBase(route.link)">
          <span class="zz-route-marker" aria-hidden="true"></span>
          <span class="zz-route-content"><strong>{{ route.title }}</strong><small>{{ route.detail }}</small></span>
          <span class="zz-route-more" aria-hidden="true">→</span>
        </a>
      </section>
    </main>
  </div>
</template>
