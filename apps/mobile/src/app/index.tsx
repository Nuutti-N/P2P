import { BrowseFeed } from '@/features/browse/browse-feed';

/**
 * Etusivu — the app's home screen. Same underlying browse feed as Selaa, but
 * with welcome context (what Syce is) so landing here cold — especially with
 * no real listings yet — reads as "this app works, nothing here yet" rather
 * than a blank search box with no explanation.
 */
export default function HomeScreen() {
  return <BrowseFeed variant="home" />;
}
