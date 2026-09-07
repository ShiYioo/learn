<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type {
  RoadmapChoice,
  RoadmapEdge,
  RoadmapGraph,
  RoadmapHandle,
  RoadmapNode,
} from './roadmaps/types'

const props = defineProps<{ graph: RoadmapGraph }>()

type Point = { x: number; y: number }

const completedIds = ref(new Set<string>())
const canvasElement = ref<HTMLElement | null>(null)
const canvasScale = ref(1)
let resizeObserver: ResizeObserver | undefined

const storageName = computed(() => `zzuli-roadmap:${props.graph.storageKey}:v3`)
const nodesById = computed(() => new Map(props.graph.nodes.map((node) => [node.id, node])))
const rootNode = computed(() => props.graph.nodes.find((node) => node.kind === 'root'))
const trackableNodes = computed(() =>
  props.graph.nodes.filter((node) => node.kind === 'main' || node.kind === 'branch'),
)
const trackableIds = computed(() => new Set(trackableNodes.value.map((node) => node.id)))
const completedCount = computed(
  () => trackableNodes.value.filter((node) => completedIds.value.has(node.id)).length,
)

const mainNodes = computed(() => {
  const root = rootNode.value
  if (!root) return []

  const ordered = [root]
  const seen = new Set([root.id])
  let currentId = root.id

  while (true) {
    const edge = props.graph.edges.find(
      (candidate) => candidate.kind === 'main' && candidate.source === currentId,
    )
    const next = edge ? nodesById.value.get(edge.target) : undefined
    if (!next || seen.has(next.id)) break

    ordered.push(next)
    seen.add(next.id)
    currentId = next.id
  }

  const unconnectedMainNodes = props.graph.nodes
    .filter((node) => node.kind === 'main' && !seen.has(node.id))
    .sort((left, right) => left.position.y - right.position.y)
  ordered.push(...unconnectedMainNodes)

  return ordered
})

const branchesByParent = computed(() => {
  const branches = new Map<string, RoadmapNode[]>()

  for (const edge of props.graph.edges) {
    if (edge.kind !== 'branch') continue
    const node = nodesById.value.get(edge.target)
    if (!node || node.kind !== 'branch') continue
    const current = branches.get(edge.source) ?? []
    current.push(node)
    branches.set(edge.source, current)
  }

  return branches
})

const sceneStyle = computed(() => ({
  width: `${props.graph.viewport.width}px`,
  height: `${props.graph.viewport.height}px`,
  transform: `scale(${canvasScale.value})`,
}))

const canvasStyle = computed(() => ({
  height: `${props.graph.viewport.height * canvasScale.value}px`,
}))

const desktopEdges = computed(() =>
  props.graph.edges
    .map((edge) => ({ edge, path: edgePath(edge) }))
    .filter((item): item is { edge: RoadmapEdge; path: string } => Boolean(item.path)),
)

function isCompleted(id: string) {
  return completedIds.value.has(id)
}

function toggleNode(id: string) {
  if (!trackableIds.value.has(id)) return

  const next = new Set(completedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  completedIds.value = next
}

function resetProgress() {
  if (typeof window === 'undefined') return
  if (!window.confirm('确认重置本地学习进度吗？此操作无法恢复。')) return
  completedIds.value = new Set()
}

function choiceLabel(choice?: RoadmapChoice) {
  if (choice === 'recommended') return '推荐路线'
  if (choice === 'alternative') return '替代选择'
  return ''
}

function nodeDimensions(node: RoadmapNode) {
  if (node.kind === 'root') return { width: 180, height: 56 }
  if (node.kind === 'main') return { width: 168, height: 48 }
  if (node.kind === 'branch') return { width: 150, height: 44 }
  return { width: 208, height: 48 }
}

function pointAt(node: RoadmapNode, handle: RoadmapHandle): Point {
  const { width, height } = nodeDimensions(node)
  const { x, y } = node.position

  return {
    top: { x, y: y - height / 2 },
    right: { x: x + width / 2, y },
    bottom: { x, y: y + height / 2 },
    left: { x: x - width / 2, y },
  }[handle]
}

function round(point: Point) {
  return { x: Math.round(point.x * 10) / 10, y: Math.round(point.y * 10) / 10 }
}

function mainPath(start: Point, end: Point, bend?: number) {
  const from = round(start)
  const to = round(end)
  if (from.x === to.x) return `M ${from.x} ${from.y} V ${to.y}`

  const middleY = bend ?? Math.round(((from.y + to.y) / 2) * 10) / 10
  return `M ${from.x} ${from.y} V ${middleY} H ${to.x} V ${to.y}`
}

function branchPath(start: Point, end: Point) {
  const from = round(start)
  const to = round(end)
  const direction = to.x > from.x ? 1 : -1
  const distance = Math.max(30, Math.abs(to.x - from.x) * 0.44)
  const firstControlX = Math.round((from.x + direction * distance) * 10) / 10
  const secondControlX = Math.round((to.x - direction * distance) * 10) / 10

  return `M ${from.x} ${from.y} C ${firstControlX} ${from.y} ${secondControlX} ${to.y} ${to.x} ${to.y}`
}

function edgePath(edge: RoadmapEdge) {
  const source = nodesById.value.get(edge.source)
  const target = nodesById.value.get(edge.target)
  if (!source || !target) return ''

  const start = pointAt(source, edge.sourceHandle ?? (edge.kind === 'main' ? 'bottom' : 'right'))
  const end = pointAt(target, edge.targetHandle ?? (edge.kind === 'main' ? 'top' : 'left'))

  return edge.kind === 'main' ? mainPath(start, end, edge.bend) : branchPath(start, end)
}

function nodeStyle(node: RoadmapNode) {
  return { left: `${node.position.x}px`, top: `${node.position.y}px` }
}

function updateCanvasScale() {
  const width = canvasElement.value?.clientWidth ?? props.graph.viewport.width
  canvasScale.value = Math.min(1, width / props.graph.viewport.width)
}

function persistProgress(ids: Set<string>) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(storageName.value, JSON.stringify([...ids]))
  } catch {
    // Progress is an optional local enhancement.
  }
}

onMounted(() => {
  try {
    const saved = window.localStorage.getItem(storageName.value)
    const ids = saved ? JSON.parse(saved) : []
    if (Array.isArray(ids)) {
      completedIds.value = new Set(
        ids.filter((id): id is string => typeof id === 'string' && trackableIds.value.has(id)),
      )
    }
  } catch {
    // Ignore malformed or unavailable local storage.
  }

  resizeObserver = new ResizeObserver(updateCanvasScale)
  if (canvasElement.value) resizeObserver.observe(canvasElement.value)
  updateCanvasScale()
})

onBeforeUnmount(() => resizeObserver?.disconnect())

watch(completedIds, persistProgress)
</script>

<template>
  <section class="roadmap-tree" :aria-label="`${graph.title}学习路线`">
    <header class="roadmap-tree__header">
      <p class="roadmap-tree__progress" aria-live="polite">
        已完成 <strong>{{ completedCount }}</strong> / {{ trackableNodes.length }}
      </p>
      <div class="roadmap-tree__meta">
        <ul class="roadmap-tree__legend" aria-label="路线标记说明">
          <li class="roadmap-tree__legend--recommended">
            <span class="roadmap-choice-marker" aria-hidden="true">✓</span>
            <span>推荐路线</span>
          </li>
          <li class="roadmap-tree__legend--alternative">
            <span class="roadmap-choice-marker" aria-hidden="true">✓</span>
            <span>替代选择</span>
          </li>
        </ul>
        <button
          class="roadmap-tree__clear"
          type="button"
          :disabled="completedCount === 0"
          title="重置本地进度"
          aria-label="重置本地进度"
          @click="resetProgress"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 3v6h6" />
          </svg>
          <span>重置</span>
        </button>
      </div>
    </header>

    <div ref="canvasElement" class="roadmap-canvas" :style="canvasStyle">
      <div class="roadmap-canvas__scene" :style="sceneStyle">
        <svg
          class="roadmap-canvas__connectors"
          :width="graph.viewport.width"
          :height="graph.viewport.height"
          :viewBox="`0 0 ${graph.viewport.width} ${graph.viewport.height}`"
          aria-hidden="true"
        >
          <path
            v-for="{ edge, path } in desktopEdges"
            :key="edge.id"
            :class="`roadmap-canvas__path--${edge.kind}`"
            :d="path"
          />
        </svg>

        <template v-for="node in graph.nodes" :key="node.id">
          <p v-if="node.kind === 'note'" class="roadmap-note" :style="nodeStyle(node)">
            {{ node.label }}
          </p>
          <button
            v-else
            class="roadmap-node"
            :class="[
              `roadmap-node--${node.kind}`,
              { 'is-completed': isCompleted(node.id), 'has-choice': node.choice },
            ]"
            :style="nodeStyle(node)"
            type="button"
            :disabled="node.kind === 'root'"
            :aria-pressed="node.kind === 'root' ? undefined : isCompleted(node.id)"
            :aria-label="
              node.kind === 'root'
                ? node.label
                : `${node.label}，${isCompleted(node.id) ? '已完成，点击取消完成' : '未完成，点击标记完成'}`
            "
            @click="toggleNode(node.id)"
          >
            <span>{{ node.label }}</span>
            <span
              v-if="node.choice"
              class="roadmap-choice-marker roadmap-node__choice"
              :class="[
                `roadmap-node__choice--${node.choice}`,
                `roadmap-node__choice--${node.choicePosition ?? 'right'}`,
              ]"
              :aria-label="choiceLabel(node.choice)"
            >
              ✓
            </span>
            <span v-if="node.kind !== 'root'" class="roadmap-node__tooltip" aria-hidden="true">
              {{ isCompleted(node.id) ? 'Cancel' : 'Done' }}
            </span>
          </button>
        </template>
      </div>
    </div>

    <div class="roadmap-mobile">
      <ol class="roadmap-mobile__main">
        <li v-for="node in mainNodes" :key="node.id" class="roadmap-mobile__step">
          <button
            class="roadmap-node"
            :class="[`roadmap-node--${node.kind}`, { 'is-completed': isCompleted(node.id) }]"
            type="button"
            :disabled="node.kind === 'root'"
            @click="toggleNode(node.id)"
          >
            <span>{{ node.label }}</span>
          </button>
          <ul v-if="branchesByParent.get(node.id)?.length" class="roadmap-mobile__branches">
            <li v-for="branch in branchesByParent.get(node.id)" :key="branch.id">
              <button
                class="roadmap-node roadmap-node--branch"
                :class="{ 'is-completed': isCompleted(branch.id), 'has-choice': branch.choice }"
                type="button"
                @click="toggleNode(branch.id)"
              >
                <span>{{ branch.label }}</span>
                <span
                  v-if="branch.choice"
                  class="roadmap-choice-marker roadmap-node__choice"
                  :class="[
                    `roadmap-node__choice--${branch.choice}`,
                    `roadmap-node__choice--${branch.choicePosition ?? 'right'}`,
                  ]"
                >
                  ✓
                </span>
              </button>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
