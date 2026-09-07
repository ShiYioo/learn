<script setup lang="ts">
import frontendRoadmapData from '../../src/roadmaps/frontend.json'
import RoadmapTree from './RoadmapTree.vue'
import type { RoadmapGraph } from './roadmaps/types'

const frontendRoadmap = frontendRoadmapData as RoadmapGraph
</script>

<template>
  <RoadmapTree :graph="frontendRoadmap" />
</template>
