import { isRoadmapGraphData } from '../../roadmap-schema.mjs'
import type { RoadmapGraph } from './types'

export function isRoadmapGraph(value: unknown): value is RoadmapGraph {
  return isRoadmapGraphData(value)
}

export function cloneRoadmapGraph(graph: RoadmapGraph): RoadmapGraph {
  return JSON.parse(JSON.stringify(graph)) as RoadmapGraph
}
