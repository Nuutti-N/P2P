import { BrowseFeed } from '@/features/browse/browse-feed';

/**
 * Selaa — the same browse UI as Etusivu, titled for the tab. There's no filter
 * panel to open any more: search is always visible and the location chips show
 * themselves only when there are actually several areas to pick between.
 */
export default function ExploreScreen() {
  return <BrowseFeed />;
}
