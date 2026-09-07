import type { RoadmapGraph } from './types'
import { roadmapDefinitionById, roadmapDefinitions } from '../../roadmap-definitions.mjs'

const roadmapModules = import.meta.glob('../../../src/roadmaps/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, RoadmapGraph>

function graphForFile(fileName: string) {
  const entry = Object.entries(roadmapModules).find(([path]) => path.endsWith(`/${fileName}`))
  if (!entry) throw new Error(`Missing roadmap data: ${fileName}`)
  return entry[1]
}

export const roadmapsById = new Map(
  roadmapDefinitions.map((definition) => [definition.id, graphForFile(definition.fileName)]),
)

export const roadmapGroups = [...new Set(roadmapDefinitions.map((definition) => definition.group))].map(
  (group) => ({
    group,
    items: roadmapDefinitions.filter((definition) => definition.group === group),
  }),
)

export { roadmapDefinitionById, roadmapDefinitions }
