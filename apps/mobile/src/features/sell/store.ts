/**
 * In-memory listing store — pilot placeholder.
 *
 * Submitted listings live here for the session only. There is no backend yet;
 * during the manual pilot the two founders follow up on each lead by email.
 * Swap this for a real API/store once the loop is proven.
 */

import type { SellerListing } from '@/features/sell/types';

const listings: SellerListing[] = [];

export function addListing(listing: SellerListing): void {
  listings.unshift(listing);
}

export function getListings(): readonly SellerListing[] {
  return listings;
}

export function makeListingId(): string {
  return `lst_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
