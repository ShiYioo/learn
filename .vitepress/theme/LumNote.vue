<script setup lang="ts">
import { withBase } from 'vitepress'

withDefaults(defineProps<{ title?: string }>(), { title: 'Lum 的小提示' })
</script>

<template>
  <aside class="lum-note">
    <img :src="withBase('/lum/lum-avatar-small.png')" alt="Lum" width="72" height="72">
    <div><strong>{{ title }}</strong><p><slot /></p></div>
  </aside>
</template>
