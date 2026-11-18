import { defineConfig } from '@protobase/config'

// The whole app, as one object. Its code is found by its path: resources in config/, roles in config/roles.ts and the
// auth hooks in auth/hooks.ts. Its address and secret are Protobase's defaults, PROTOBASE_URL and PROTOBASE_SECRET (see
// .env.example).
export default defineConfig({
  auth: {
    // No defaultRole on purpose: every account is created with an explicit role (`protobase users create --role`).
    roles: ['admin', 'manager', 'finance', 'maintenance', 'member'],
    // Colleagues join on their own as a `member`, who only sees the portfolio until an admin gives them a real role.
    // The empty list keeps sign-up off; a host turns it on for the owner's domain with PROTOBASE_SIGN_UP_DOMAINS.
    signUp: { role: 'member', domains: [] },
  },
  // Organizations are not used yet: everyone works in organization 1.
  authenticate: { tenant: 1 },
})
