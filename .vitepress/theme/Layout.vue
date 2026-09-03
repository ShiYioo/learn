<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Home from './Home.vue'
import NotFound from './NotFound.vue'
import SidebarBrand from './SidebarBrand.vue'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
const DefaultLayout = DefaultTheme.Layout
</script>

<template>
  <Home v-if="isHome" />
  <DefaultLayout v-else>
    <template #not-found>
      <NotFound />
    </template>
    <template #sidebar-nav-before>
      <SidebarBrand />
    </template>
  </DefaultLayout>
</template>
