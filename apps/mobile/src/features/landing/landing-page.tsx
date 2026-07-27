import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { ScrollView, View } from 'react-native';

import { PrimaryButton } from '@/components/form/primary-button';
import { SiteFooter } from '@/components/site-footer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NavBrand, Spacing } from '@/constants/theme';
import { useContentMaxWidth, useIsDesktopWeb } from '@/hooks/use-desktop-layout';

/** Exactly the icon names SymbolView accepts — borrowed from its own props. */
type SymbolName = React.ComponentProps<typeof SymbolView>['name'];

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
              Kaksi tuntematonta, iso summa rahaa ja satoja kilometrejä väliä. Syce vahvistaa
              molempien henkilöllisyyden, ja kuljettajamme tuo auton perille — sinun ei tarvitse
              ajaa mihinkään.
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
            <DeliveryCard />
          </View>
        </View>

        {/* What Syce actually does */}
        <View className={isDesktop ? 'flex-row' : 'flex-col'} style={{ gap: Spacing.three }}>
          <Point
            icon={{ ios: 'checkmark.shield.fill', android: 'verified_user', web: 'verified_user' }}
            title="Molemmat tunnistetaan"
            body="Myyjä ja ostaja vahvistavat henkilöllisyytensä ennen kuin kauppa etenee."
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
 * The hero's visual anchor: the handover Syce sells, drawn as seller → driver →
 * buyer. Roles only — no names, prices or ratings, so nothing here can read as
 * a real listing or a real person.
 */
function DeliveryCard() {
  return (
    <View className="gap-5 rounded-3xl bg-forest p-7">
      <View className="flex-row items-center">
        <Endpoint icon={{ ios: 'person.fill', android: 'person', web: 'person' }} label="Myyjä" />
        <View className="mx-3 mb-6 h-px flex-1 bg-white/25" />
        <Endpoint icon={{ ios: 'person.fill', android: 'person', web: 'person' }} label="Ostaja" />
      </View>

      <View className="items-center gap-2">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-terracotta/25">
          <SymbolView
            tintColor="#E8B39E"
            name={{ ios: 'car.fill', android: 'local_shipping', web: 'local_shipping' }}
            size={26}
          />
        </View>
        <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
          Kuljetus kotiovelle
        </ThemedText>
        <ThemedText type="small" className="max-w-[240px] text-center" style={{ color: '#FFFFFFB8' }}>
          Kuljettajamme hoitaa noudon ja luovutuksen puolestasi.
        </ThemedText>
      </View>

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

function Endpoint({ icon, label }: { icon: SymbolName; label: string }) {
  return (
    <View className="items-center gap-2">
      <View className="h-11 w-11 items-center justify-center rounded-full bg-white/15">
        <SymbolView tintColor="#FFFFFF" name={icon} size={19} />
      </View>
      <ThemedText type="small" style={{ color: '#FFFFFFD9' }}>
        {label}
      </ThemedText>
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
