<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { RoadmapChoice, RoadmapChoicePosition, RoadmapNodeKind } from './roadmaps/types'

defineProps<{
  data: {
    label: string
    kind: RoadmapNodeKind
    choice?: RoadmapChoice
    choicePosition?: RoadmapChoicePosition
  }
}>()
</script>

<template>
  <div class="roadmap-editor-node" :class="[`roadmap-editor-node--${data.kind}`, { 'has-choice': data.choice }]">
    <template v-if="data.kind !== 'note'">
      <Handle id="top" type="source" :position="Position.Top" />
      <Handle id="right" type="source" :position="Position.Right" />
      <Handle id="bottom" type="source" :position="Position.Bottom" />
      <Handle id="left" type="source" :position="Position.Left" />
    </template>
    <span class="roadmap-editor-node__label">{{ data.label }}</span>
    <span
      v-if="data.choice"
      class="roadmap-editor-node__choice"
      :class="[`is-${data.choice}`, `is-${data.choicePosition ?? 'right'}`]"
    >✓</span>
  </div>
</template>
