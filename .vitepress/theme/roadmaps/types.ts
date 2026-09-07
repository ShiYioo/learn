export type RoadmapChoice = 'recommended' | 'alternative'
export type RoadmapChoicePosition = 'left' | 'right'
export type RoadmapNodeKind = 'root' | 'main' | 'branch' | 'note'
export type RoadmapEdgeKind = 'main' | 'branch'
export type RoadmapHandle = 'top' | 'right' | 'bottom' | 'left'

export interface RoadmapPosition {
  x: number
  y: number
}

export interface RoadmapNode {
  id: string
  label: string
  kind: RoadmapNodeKind
  position: RoadmapPosition
  choice?: RoadmapChoice
  choicePosition?: RoadmapChoicePosition
}

export interface RoadmapEdge {
  id: string
  source: string
  target: string
  kind: RoadmapEdgeKind
  sourceHandle?: RoadmapHandle
  targetHandle?: RoadmapHandle
  bend?: number
}

export interface RoadmapGraph {
  version: 1
  id: string
  title: string
  storageKey: string
  viewport: {
    width: number
    height: number
  }
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
}
