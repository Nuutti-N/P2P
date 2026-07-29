import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, TextInput, View, type TextInputProps } from 'react-native';

import { PrimaryButton } from '@/components/form/primary-button';
import { SiteFooter } from '@/components/site-footer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NavBrand, Spacing } from '@/constants/theme';
import { useContentMaxWidth, useIsDesktopWeb } from '@/hooks/use-desktop-layout';

/** Exactly the icon names SymbolView accepts — borrowed from its own props. */
type SymbolName = React.ComponentProps<typeof SymbolView>['name'];

/** Where pickup requests land. Point this at the real inbox before launch. */
const ORDER_EMAIL = 'hei@syce.fi';

/**
 * Landing page — what a cold visitor sees on desktop web before they've decided
 * whether Syce is for them. Deliberately short: one promise, the three things
 * Syce actually does, and where it operates. No "how it works" marketing
 * sections, no stats, no reviews.
 */
export function LandingPage() {
  const router = useRouter();
  const maxWidth = useContentMaxWidth();
  const isDesktop = useIsDesktopWeb();

  return (
    <ScrollView
      className="flex-1 bg-cream dark:bg-surface-dark"
      contentContainerClassName="flex-row justify-center px-6"
      contentContainerStyle={{ paddingTop: Spacing.five, paddingBottom: Spacing.six }}>
      <ThemedView className="w-full" style={{ maxWidth, gap: Spacing.six }}>
        {/* Hero — text left, the delivery itself pictured right. The card is the
            page's only heavy visual, so the rest can stay quiet. */}
        <View
          className={isDesktop ? 'flex-row items-center' : 'flex-col'}
          style={{ gap: Spacing.five }}>
          <View className="flex-1 gap-4">
            <ThemedText type="title" className="text-[46px] leading-[54px]">
              Osta ja myy auto{'\n'}ilman riskiä.
            </ThemedText>
            <ThemedText themeColor="textSecondary" className="max-w-[460px]">
              Kaksi tuntematonta, iso summa rahaa ja satoja kilometrejä väliä. Me käymme auton
              luona, tarkastamme sen ja kerromme mitä löysimme. Kuljettajamme tuo auton perille —
              sinun ei tarvitse ajaa mihinkään.
            </ThemedText>

            <View className="mt-2 flex-row flex-wrap gap-3">
              <PrimaryButton
                title="Myy autosi"
                onPress={() => router.push('/sell')}
                className="w-auto self-start px-8"
              />
              <PrimaryButton
                title="Selaa autoja"
                variant="secondary"
                onPress={() => router.push('/explore')}
                className="w-auto self-start px-8"
              />
            </View>
          </View>

          <View className="flex-1">
            <OrderCard />
          </View>
        </View>

        {/* What Syce actually does */}
        <View className={isDesktop ? 'flex-row' : 'flex-col'} style={{ gap: Spacing.three }}>
          <Point
            icon={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
            title="Tarkastamme auton"
            body="Käymme auton luona ennen kauppaa, kuvaamme sen ja kerromme viat rehellisesti."
          />
          <Point
            icon={{ ios: 'car.fill', android: 'local_shipping', web: 'local_shipping' }}
            title="Kuljettaja hoitaa toimituksen"
            body="Auto noudetaan myyjältä ja ajetaan ostajalle. Kuljettaja kuuluu aina hintaan."
          />
          <Point
            icon={{ ios: 'eurosign.circle.fill', android: 'euro', web: 'euro' }}
            title="Hinta sovitaan etukäteen"
            body="Auton hinta ja toimituksen kulut käydään läpi ennen kuin auto lähtee liikkeelle."
          />
        </View>

        {/* Service area — where Syce actually operates today. */}
        <ThemedView type="backgroundElement" className="gap-2 rounded-2xl p-6">
          <ThemedText type="smallBold" style={{ color: NavBrand }}>
            Toimimme Mikkelissä ja Helsingissä
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" className="max-w-[560px]">
            Hoidamme noudot ja toimitukset Mikkelin ja Helsingin välillä. Otamme jokaiseen kauppaan
            yhteyttä henkilökohtaisesti ja sovimme aikataulun kanssasi.
          </ThemedText>
        </ThemedView>

        <SiteFooter />
      </ThemedView>
    </ScrollView>
  );
}

/**
 * The hero's action card — the page's one conversion point. Collects the two
 * things needed to price a job (where the car is, where it goes) plus the
 * listing so we can see the car before calling back.
 *
 * There's no backend yet, so submitting opens a prefilled email rather than
 * pretending the request was stored somewhere.
 */
function OrderCard() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [listing, setListing] = useState('');

  const ready = from.trim().length > 0 && to.trim().length > 0;

  function send() {
    const body = [
      `Nouto: ${from.trim()}`,
      `Toimitus: ${to.trim()}`,
      listing.trim() ? `Ilmoitus: ${listing.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const subject = encodeURIComponent('Kuljetus- ja tarkastuspyyntö');
    Linking.openURL(`mailto:${ORDER_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`);
  }

  return (
    <View className="gap-5 rounded-3xl bg-forest p-7">
      <View className="gap-1">
        <ThemedText type="subtitle" className="text-[22px] leading-7" style={{ color: '#FFFFFF' }}>
          Tilaa kuljetus ja tarkastus
        </ThemedText>
        <ThemedText type="small" style={{ color: '#FFFFFFB8' }}>
          Kerro mistä auto haetaan ja minne se tuodaan. Otamme sinuun yhteyttä.
        </ThemedText>
      </View>

      <View className="gap-3">
        <CardField label="Mistä" placeholder="Mikkeli" value={from} onChangeText={setFrom} />
        <CardField label="Minne" placeholder="Helsinki" value={to} onChangeText={setTo} />
        <CardField
          label="Linkki ilmoitukseen"
          placeholder="nettiauto.com/…"
          value={listing}
          onChangeText={setListing}
          autoCapitalize="none"
          autoCorrect={false}
          inputMode="url"
        />
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={!ready}
        onPress={send}
        className={[
          'min-h-12 items-center justify-center rounded-full bg-white px-4 py-3 active:opacity-85',
          ready ? '' : 'opacity-50',
        ]
          .filter(Boolean)
          .join(' ')}>
        <ThemedText type="smallBold" style={{ color: NavBrand }}>
          Lähetä pyyntö
        </ThemedText>
      </Pressable>

      <View className="h-px bg-white/20" />

      <View className="flex-row items-center gap-2">
        <SymbolView tintColor="#FFFFFFB8" name={{ ios: 'lock.fill', android: 'lock', web: 'lock' }} size={13} />
        <ThemedText type="small" style={{ color: '#FFFFFFB8' }}>
          Hinta sovitaan ennen kuin auto lähtee
        </ThemedText>
      </View>
    </View>
  );
}

/** Text input styled for the forest card — the shared TextField is beige-on-cream. */
function CardField({ label, ...rest }: TextInputProps & { label: string }) {
  return (
    <View className="gap-1">
      <ThemedText type="small" style={{ color: '#FFFFFFB8' }}>
        {label}
      </ThemedText>
      <TextInput
        placeholderTextColor="#FFFFFF66"
        className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-base text-white"
        {...rest}
      />
    </View>
  );
}

function Point({ icon, title, body }: { icon: SymbolName; title: string; body: string }) {
  return (
    <ThemedView type="backgroundElement" className="flex-1 gap-2 rounded-2xl p-5">
      <SymbolView tintColor={NavBrand} name={icon} size={20} />
      <ThemedText type="smallBold">{title}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {body}
      </ThemedText>
    </ThemedView>
  );
}
