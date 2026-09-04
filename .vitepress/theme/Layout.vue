<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Home from './Home.vue'
import NotFound from './NotFound.vue'
import SidebarBrand from './SidebarBrand.vue'
import GiscusComments from './GiscusComments.vue'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
const showComments = computed(() => frontmatter.value.comments !== false)
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
    <template #doc-after>
      <GiscusComments v-if="showComments" />
    </template>
  </DefaultLayout>
</template>
