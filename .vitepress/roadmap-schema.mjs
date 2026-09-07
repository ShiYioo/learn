const nodeKinds = new Set(['root', 'main', 'branch', 'note'])
const edgeKinds = new Set(['main', 'branch'])
const choices = new Set(['recommended', 'alternative'])
const choicePositions = new Set(['left', 'right'])
const handles = new Set(['top', 'right', 'bottom', 'left'])

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function isNode(value) {
  if (!isRecord(value) || !isRecord(value.position)) return false
  if (
    typeof value.id !== 'string' ||
    typeof value.label !== 'string' ||
    !nodeKinds.has(String(value.kind)) ||
    !isFiniteNumber(value.position.x) ||
    !isFiniteNumber(value.position.y)
  ) {
    return false
  }

  const hasChoice = choices.has(String(value.choice)) && !['root', 'note'].includes(String(value.kind))
  const hasChoicePosition = value.choicePosition === undefined || choicePositions.has(String(value.choicePosition))
  return (value.choice === undefined && value.choicePosition === undefined) || (hasChoice && hasChoicePosition)
}

function isEdge(value) {
  if (!isRecord(value)) return false
  if (
    typeof value.id !== 'string' ||
    typeof value.source !== 'string' ||
    typeof value.target !== 'string' ||
    !edgeKinds.has(String(value.kind))
  ) {
    return false
  }

  return (
    (value.sourceHandle === undefined || handles.has(String(value.sourceHandle))) &&
    (value.targetHandle === undefined || handles.has(String(value.targetHandle))) &&
    (value.bend === undefined || isFiniteNumber(value.bend))
  )
}

export function isRoadmapGraphData(value) {
  if (!isRecord(value) || !isRecord(value.viewport)) return false
  if (
    value.version !== 1 ||
    typeof value.id !== 'string' ||
    typeof value.title !== 'string' ||
    typeof value.storageKey !== 'string' ||
    !isFiniteNumber(value.viewport.width) ||
    !isFiniteNumber(value.viewport.height) ||
    !Array.isArray(value.nodes) ||
    !Array.isArray(value.edges) ||
    value.nodes.length === 0 ||
    value.nodes.length > 200 ||
    value.edges.length > 400 ||
    !value.nodes.every(isNode) ||
    !value.edges.every(isEdge)
  ) {
    return false
  }

  const nodeIds = new Set(value.nodes.map((node) => node.id))
  const edgeIds = new Set(value.edges.map((edge) => edge.id))
  const nodesById = new Map(value.nodes.map((node) => [node.id, node]))

  return (
    nodeIds.size === value.nodes.length &&
    edgeIds.size === value.edges.length &&
    value.nodes.filter((node) => node.kind === 'root').length === 1 &&
    value.edges.every(
      (edge) =>
        nodeIds.has(edge.source) &&
        nodeIds.has(edge.target) &&
        nodesById.get(edge.source)?.kind !== 'note' &&
        nodesById.get(edge.target)?.kind !== 'note',
    )
  )
}
