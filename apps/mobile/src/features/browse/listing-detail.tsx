import { SymbolView } from 'expo-symbols';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InfoNote } from '@/components/form/info-note';
import { PrimaryButton } from '@/components/form/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing, TrustBadge } from '@/constants/theme';
import type { SellerListing } from '@/features/sell/types';
import { useTheme } from '@/hooks/use-theme';

/**
 * Listing detail as a modal rather than a routed screen — the custom tab bar
 * (see app-tabs.tsx) only knows about the 5 top-level tab routes, so a nested
 * `/listing/[id]` route risks not resolving cleanly through it. A modal gets
 * the same "see full details" job done without touching routing.
 */
export function ListingDetail({
  listing,
  onClose,
}: {
  listing: SellerListing | null;
  onClose: () => void;
}) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={listing != null} animationType="slide" onRequestClose={onClose}>
      {listing && (
        <ScrollView
          className="flex-1 bg-cream dark:bg-surface-dark"
          contentContainerClassName="flex-row justify-center px-4 pb-16"
          contentContainerStyle={{ paddingTop: insets.top + Spacing.three }}>
          <ThemedView className="w-full gap-3" style={{ maxWidth: MaxContentWidth }}>
            <Pressable onPress={onClose} accessibilityRole="button" className="self-end">
              <ThemedView type="backgroundElement" className="h-9 w-9 items-center justify-center rounded-full">
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'xmark', android: 'close', web: 'close' }}
                  size={16}
                />
              </ThemedView>
            </Pressable>

            <View className="aspect-video items-center justify-center rounded-2xl bg-beige dark:bg-surface-dark-element">
              <SymbolView
                tintColor={theme.textSecondary}
                name={{ ios: 'car.fill', android: 'directions_car', web: 'directions_car' }}
                size={48}
              />
            </View>

            <View className="flex-row items-start justify-between gap-2">
              <ThemedText type="subtitle" className="flex-1">
                {listing.vehicle.make} {listing.vehicle.model} {listing.vehicle.year}
              </ThemedText>
              <ThemedText type="subtitle">{listing.askingPriceEur} €</ThemedText>
            </View>

            {listing.identityVerified && (
              <View className="flex-row items-center gap-1 self-start rounded-full bg-trust-bg px-3 py-1">
                <SymbolView
                  tintColor={TrustBadge.text}
                  name={{ ios: 'checkmark.shield.fill', android: 'verified', web: 'verified' }}
                  size={13}
                />
                <ThemedText type="small" style={{ color: TrustBadge.text }}>
                  Vahvistettu myyjä
                </ThemedText>
              </View>
            )}

            <ThemedView type="backgroundElement" className="gap-2 rounded-2xl p-4">
              <SpecRow label="Rekisterinumero" value={listing.vehicle.plate} />
              <SpecRow
                label="Mittarilukema"
                value={`${Number(listing.vehicle.mileageKm || 0).toLocaleString('fi-FI')} km`}
              />
              <SpecRow label="Polttoaine" value={listing.vehicle.fuel} />
              <SpecRow label="Katsastus voimassa" value={listing.vehicle.inspectionValidUntil} />
              <SpecRow label="Sijainti" value={listing.area} />
            </ThemedView>

            {listing.description ? (
              <View className="gap-1">
                <ThemedText type="smallBold">Myyjän kuvaus</ThemedText>
                <ThemedText themeColor="textSecondary">{listing.description}</ThemedText>
              </View>
            ) : null}

            {listing.knownFaults ? (
              <View className="gap-1">
                <ThemedText type="smallBold">Tiedossa olevat viat</ThemedText>
                <ThemedText themeColor="textSecondary">{listing.knownFaults}</ThemedText>
              </View>
            ) : null}

            <InfoNote tone="info" title="Kuljettaja hoitaa toimituksen">
              Vahvistettu kuljettaja noutaa auton myyjältä ja tuo sen sinulle. Sinulla on 30
              minuuttia koeajoaikaa ennen lopullista päätöstä.
            </InfoNote>

            <PrimaryButton title="Ota yhteyttä myyjään" disabled />
            <InfoNote tone="demo" title="Demo — ei vielä kytketty">
              Yhteydenotto ja maksu eivät ole vielä käytössä. Pilotissa perustajat sopivat kaupat
              käsin.
            </InfoNote>
          </ThemedView>
        </ScrollView>
      )}
    </Modal>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-3">
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="smallBold">{value || '—'}</ThemedText>
    </View>
  );
}
