/**
 * Identity verification — MOCK ONLY.
 *
 * ⚠️ This does NOT verify anyone yet. It simulates the round-trip so the
 * onboarding flow can be built and demoed end-to-end. Nothing here should be
 * presented to a user as a real identity check.
 *
 * Production plan (from the brief's trust & safety requirements):
 *   - Finnish Trust Network (FTN): bank ID / Mobiilivarmenne.
 *   - Broker via Signicat so we integrate once rather than per-bank.
 *   - The real flow redirects the user to the provider and returns a signed
 *     assertion; we never handle bank credentials ourselves.
 */

import type { IdentityMethod } from '@/features/sell/types';

export type IdentityResult = {
  verified: boolean;
  method: IdentityMethod;
  /** ISO timestamp of when the (mock) verification completed. */
  verifiedAt: string;
};

const MOCK_DELAY_MS = 1400;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates a successful identity verification after a short delay.
 * Replace with a Signicat/FTN redirect flow before any real use.
 */
export async function verifyIdentity(method: IdentityMethod): Promise<IdentityResult> {
  await wait(MOCK_DELAY_MS);
  return {
    verified: true,
    method,
    verifiedAt: new Date().toISOString(),
  };
}
