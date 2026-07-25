/**
 * License-plate lookup — MOCK ONLY.
 *
 * ⚠️ Returns canned/generated data. It is NOT connected to Traficom.
 *
 * Production plan (from the domain doc):
 *   - Traficom exposes technical data, tax status, and inspection history by
 *     registration number. Pre-fill the listing from that lookup so the seller
 *     types as little as possible, and so the buyer later sees verified specs.
 *   - Also the place to check that the seller is the registered owner — a core
 *     fraud signal — once real data is wired in.
 */

import type { VehicleInfo } from '@/features/sell/types';

const MOCK_DELAY_MS = 1100;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function normalisePlate(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, '');
}

/** A few hand-written entries so demos feel real; anything else is generated. */
const KNOWN: Record<string, Omit<VehicleInfo, 'plate'>> = {
  'ABC-123': {
    make: 'Toyota',
    model: 'Corolla',
    year: '2017',
    mileageKm: '128000',
    fuel: 'Bensiini',
    inspectionValidUntil: '2027-03-14',
  },
  'XYZ-789': {
    make: 'Volkswagen',
    model: 'Golf',
    year: '2015',
    mileageKm: '176500',
    fuel: 'Diesel',
    inspectionValidUntil: '2026-11-02',
  },
};

const MAKES = ['Toyota', 'Volkswagen', 'Skoda', 'Volvo', 'Ford', 'Nissan'];
const MODELS = ['Corolla', 'Golf', 'Octavia', 'V60', 'Focus', 'Qashqai'];
const FUELS = ['Bensiini', 'Diesel', 'Hybridi'];

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length];
}

/**
 * Simulates a Traficom plate lookup. Never returns null in the mock so the
 * demo flow always proceeds; the real implementation should surface "not
 * found" and ownership-mismatch cases.
 */
export async function lookupPlate(rawPlate: string): Promise<VehicleInfo> {
  const plate = normalisePlate(rawPlate);
  await wait(MOCK_DELAY_MS);

  const known = KNOWN[plate];
  if (known) {
    return { plate, ...known };
  }

  // Deterministic pseudo-data derived from the plate so repeat lookups match.
  const seed = [...plate].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return {
    plate,
    make: pick(MAKES, seed),
    model: pick(MODELS, seed + 1),
    year: String(2012 + (seed % 12)),
    mileageKm: String(80000 + (seed % 140) * 1000),
    fuel: pick(FUELS, seed),
    inspectionValidUntil: `2027-0${1 + (seed % 9)}-15`,
  };
}
