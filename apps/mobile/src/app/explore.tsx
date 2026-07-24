import { BrowseFeed } from '@/features/browse/browse-feed';

/**
 * Selaa — same browse UI as Etusivu, opened with the filter panel visible
 * (per the Figma handoff spec, the two tabs are one behavior).
 */
export default function ExploreScreen() {
  return <BrowseFeed initialFiltersOpen />;
}
