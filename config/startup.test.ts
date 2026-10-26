import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { configExports, createAdmin, mergeConfig, type Authenticator, type ProjectConfig } from '@protobase/server'

// The app's admin API built from its own protobase.config.ts with Protobase's public server API, as `dev` and `serve`
// build it, with its own auth, so a startup check such as an owner field that must hold the user ids refuses here
// instead of on the app's first start. Building the API reaches no database.
describe('the app', () => {
  beforeAll(() => {
    vi.stubEnv('BETTER_AUTH_SECRET', 'a-secret-only-this-test-uses-0123456789')
    vi.stubEnv('DATABASE_URL', 'postgres://nobody@127.0.0.1:1/none')
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it('passes the startup checks with its own auth', async () => {
    const project = mergeConfig(((await import('../protobase.config')).default ?? {}) as ProjectConfig)
    expect(project.auth, 'the app signs in with Better Auth').toBeDefined()
    const { resources, views, pages, userMenu, bottomBars, subscriptions } = configExports(project.config ?? {})
    expect(() =>
      createAdmin({
        resources,
        views,
        pages,
        ...(userMenu && { userMenu }),
        bottomBars,
        subscriptions,
        db: {} as never,
        authenticate: project.authenticate as Authenticator,
        ...(project.auth && { auth: project.auth }),
        ...(project.functions && { functions: project.functions }),
        ...(project.files && { files: project.files }),
        ...(project.events && { events: project.events }),
        ...(project.history && { history: project.history }),
        ...(project.webhooks && { webhooks: project.webhooks }),
        ...(project.notifications && { notifications: project.notifications }),
        ...(project.app && { app: project.app }),
        ...(project.options && { options: project.options }),
      }),
    ).not.toThrow()
  }, 60_000)
})
