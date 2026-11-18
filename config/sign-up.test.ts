import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loadProjectAuth } from '@protobase/cli/auth'

// Open sign-up as protobase.config.ts sets it, built with the app's own sign-in over a database it never reaches: a
// host turns it on for a domain with PROTOBASE_SIGN_UP_DOMAINS. `signUp` is what `GET /api/auth/status` offers, and an
// address elsewhere is refused before the database is read.
describe('open sign-up', () => {
  beforeEach(() => {
    vi.stubEnv('PROTOBASE_SECRET', 'a-secret-only-this-test-uses-0123456789')
    vi.stubEnv('PROTOBASE_URL', 'http://localhost:5173')
    vi.stubEnv('DATABASE_URL', 'postgres://nobody@127.0.0.1:1/none')
    vi.stubEnv('PROTOBASE_SMTP_URL', 'smtp://127.0.0.1:1')
    vi.stubEnv('PROTOBASE_MAIL_FROM', 'app@example.com')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  const sendCode = async (email: string) => {
    const auth = await loadProjectAuth(process.cwd())
    const response = await auth.handler(new Request('http://localhost:5173/api/auth/sign-up/send-code', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'http://localhost:5173' },
      body: JSON.stringify({ email }),
    }))
    return { status: response.status, body: await response.json() }
  }

  it('is off without a domain', async () => {
    vi.stubEnv('PROTOBASE_SIGN_UP_DOMAINS', undefined)
    const auth = await loadProjectAuth(process.cwd())
    expect(auth.signUp).toBe(false)
    expect(auth.signUpTakes('someone@example.com')).toBe(false)
  }, 60_000)

  it('takes addresses at the domain the host passes, as a member', async () => {
    vi.stubEnv('PROTOBASE_SIGN_UP_DOMAINS', 'example.com')
    const auth = await loadProjectAuth(process.cwd())
    expect(auth.signUp).toBe(true)
    expect(auth.signUpRole).toBe('member')
    expect(auth.signUpTakes('someone@example.com')).toBe(true)
  }, 60_000)

  it('refuses an address at another domain', async () => {
    vi.stubEnv('PROTOBASE_SIGN_UP_DOMAINS', 'example.com')
    expect(await sendCode('someone@example.org')).toMatchObject({ status: 403, body: { code: 'EMAIL_DOMAIN_NOT_ALLOWED' } })
  }, 60_000)
})
