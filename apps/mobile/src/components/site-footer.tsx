import { useRouter } from 'expo-router';
import { Linking, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { NavBrand, Spacing } from '@/constants/theme';
import { useIsDesktopWeb } from '@/hooks/use-desktop-layout';

/**
 * Real destinations go here. A link only becomes clickable once its URL is
 * filled in — an empty string renders the label greyed out instead of pretending
 * to go somewhere. Fill these in when the pages and accounts actually exist.
 */
const LINKS = {
  privacy: '',
  terms: '',
  instagram: '',
  facebook: '',
  linkedin: '',
};

/**
 * Site footer — brand, the paths into the product, follow links, and the legal
 * row. Web-shaped: on phones the bottom tab bar already owns the bottom of the
 * screen, so this only renders on desktop web.
 */
export function SiteFooter() {
  const router = useRouter();
  const isDesktop = useIsDesktopWeb();

  if (!isDesktop) return null;

  return (
    <View className="mt-16 border-t border-beige-dark pt-10 dark:border-surface-dark-selected">
      <View className="flex-row flex-wrap" style={{ gap: Spacing.five }}>
        <View className="min-w-[220px] flex-1 gap-2">
          <ThemedText type="title" className="text-[21px] leading-7" style={{ color: NavBrand }}>
            Syce
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" className="max-w-[240px]">
            Turvallinen tapa ostaa ja myydä käytettyjä autoja Suomessa.
          </ThemedText>
        </View>

        <FooterColumn title="Tuotteet">
          <FooterLink label="Myy autosi" onPress={() => router.push('/sell')} />
          <FooterLink label="Osta auto" onPress={() => router.push('/explore')} />
          <FooterLink label="Toimitukset" onPress={() => router.push('/toimitukset')} />
        </FooterColumn>

        <FooterColumn title="Yritys">
          <FooterLink label="Oma profiili" onPress={() => router.push('/profiili')} />
        </FooterColumn>

        <FooterColumn title="Seuraa meitä">
          <FooterLink label="Instagram" url={LINKS.instagram} />
          <FooterLink label="Facebook" url={LINKS.facebook} />
          <FooterLink label="LinkedIn" url={LINKS.linkedin} />
        </FooterColumn>
      </View>

      <View className="mt-10 flex-row flex-wrap items-center justify-between gap-3 border-t border-beige-dark pt-5 dark:border-surface-dark-selected">
        <ThemedText type="small" themeColor="textSecondary">
          © {new Date().getFullYear()} Syce
        </ThemedText>
        <View className="flex-row gap-5">
          <FooterLink label="Tietosuojaseloste" url={LINKS.privacy} />
          <FooterLink label="Käyttöehdot" url={LINKS.terms} />
        </View>
      </View>
    </View>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="min-w-[150px] gap-3">
      <ThemedText type="smallBold">{title}</ThemedText>
      <View className="gap-2">{children}</View>
    </View>
  );
}

/**
 * `onPress` for in-app routes, `url` for external ones. A `url` that's still an
 * empty string means we haven't got that page or account yet, so the label
 * renders dimmed and does nothing rather than looking like a working link.
 */
function FooterLink({
  label,
  onPress,
  url,
}: {
  label: string;
  onPress?: () => void;
  url?: string;
}) {
  const handler = onPress ?? (url ? () => Linking.openURL(url) : undefined);

  if (!handler) {
    return (
      <ThemedText type="small" themeColor="textSecondary" className="opacity-50">
        {label}
      </ThemedText>
    );
  }

  return (
    <Pressable accessibilityRole="link" onPress={handler} className="self-start active:opacity-60">
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </Pressable>
  );
}
