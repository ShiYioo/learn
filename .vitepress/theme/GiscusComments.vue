<script setup lang="ts">
import Giscus from '@giscus/vue'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const theme = computed(() => (isDark.value ? 'dark' : 'light'))
</script>

<template>
  <section class="giscus-comments" aria-labelledby="giscus-comments-title">
    <p
      id="giscus-comments-title"
      class="giscus-comments__title"
      role="heading"
      aria-level="2"
    >
      讨论
    </p>
    <Giscus
      id="comments"
      repo="zzuli-dev/learn"
      repo-id="R_kgDOUNAv2w"
      category="Announcements"
      category-id="DIC_kwDOUNAv284DE2wN"
      mapping="pathname"
      strict="1"
      reactions-enabled="0"
      emit-metadata="0"
      input-position="top"
      :theme="theme"
      lang="zh-CN"
      loading="lazy"
    />
  </section>
</template>
