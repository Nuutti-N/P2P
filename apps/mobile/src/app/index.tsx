import { BrowseFeed } from '@/features/browse/browse-feed';
import { LandingPage } from '@/features/landing/landing-page';
import { useIsDesktopWeb } from '@/hooks/use-desktop-layout';

/**
 * Etusivu. On desktop web this is a cold visitor's first screen, so it shows the
 * landing page (what Syce is, and why to trust it). On phones the user is
 * already inside the app, so it goes straight to the browse feed.
 */
export default function HomeScreen() {
  const isDesktop = useIsDesktopWeb();

  return isDesktop ? <LandingPage /> : <BrowseFeed variant="home" />;
}
