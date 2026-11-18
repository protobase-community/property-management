import { prunePage } from '@protobase/layout'
import { resolveAccess } from '@protobase/schema'
import { configExports } from '@protobase/server'
import { describe, expect, it } from 'vitest'
import * as config from './index'

const member = { user: { id: 6, roles: ['member'] } }
const { resources, pages } = configExports(config)

/** The resources a member can do anything with, by name, and what they may do with each. */
const memberAccess = async () => {
  const accesses = await Promise.all(resources.map(async (source) => ({
    model: source.toModel(),
    operations: (await resolveAccess(source, member)).operations,
  })))
  return accesses.filter(({ operations }) => Object.values(operations).some(Boolean))
}

describe('a member, who joined with an address at the company domain', () => {
  it('reads the properties and units, and nothing else', async () => {
    const visible = await memberAccess()
    expect(Object.fromEntries(visible.map(({ model, operations }) => [model.name, operations]))).toEqual({
      properties: { list: true, read: true, create: false, update: false, delete: false },
      units: { list: true, read: true, create: false, update: false, delete: false },
    })
  })

  it('sees only the overview blocks about units', async () => {
    const visible = await memberAccess()
    const overview = pages.find((entry) => entry.name === 'overview')!.toModel()
    const pruned = prunePage(overview, ['member'], {
      models: Object.fromEntries(visible.map(({ model }) => [model.name, model])),
      permissions: Object.fromEntries(visible.map(({ model, operations }) => [model.name, { create: operations.create, update: operations.update }])),
      actions: () => new Set(),
    })
    const named = new Set([...JSON.stringify(pruned).matchAll(/"resource":"(\w+)"/g)].map((match) => match[1]))
    expect([...named]).toEqual(['units'])
  })
})
