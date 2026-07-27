import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InfoNote } from '@/components/form/info-note';
import { PrimaryButton } from '@/components/form/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { getListings } from '@/features/sell/store';
import { useContentMaxWidth } from '@/hooks/use-desktop-layout';

export default function ProfiiliScreen() {
  const insets = useSafeAreaInsets();
  const contentMaxWidth = useContentMaxWidth();
  const [showDriverNote, setShowDriverNote] = useState(false);

  const myListings = getListings();

  const contentPadding = {
    paddingTop: Platform.OS === 'web' ? Spacing.four : Spacing.two,
    paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
  };

  return (
    <ScrollView
      className="flex-1 bg-cream dark:bg-surface-dark"
      contentContainerClassName="flex-row justify-center px-4"
      contentContainerStyle={contentPadding}>
      <ThemedView className="w-full gap-4" style={{ maxWidth: contentMaxWidth }}>
        <ThemedText type="subtitle">Profiili</ThemedText>

        <ThemedView type="backgroundElement" className="gap-1 rounded-2xl p-4">
          <ThemedText type="smallBold">Henkilöllisyyden vahvistus</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Ei vielä vahvistettu tällä profiililla. Vahvistus tehdään &ldquo;Myy&rdquo;-välilehdellä
            listaamisen yhteydessä (BankID / Mobiilivarmenne).
          </ThemedText>
        </ThemedView>

        <View className="gap-2">
          <ThemedText type="smallBold">Omat ilmoitukset</ThemedText>
          {myListings.length === 0 ? (
            <ThemedView type="backgroundElement" className="gap-1 rounded-2xl p-4">
              <ThemedText type="small" themeColor="textSecondary">
                Et ole vielä lisännyt yhtään autoa myyntiin.
              </ThemedText>
            </ThemedView>
          ) : (
            myListings.map((listing) => (
              <ThemedView key={listing.id} type="backgroundElement" className="gap-0.5 rounded-2xl p-4">
                <ThemedText type="smallBold">
                  {listing.vehicle.make} {listing.vehicle.model} {listing.vehicle.year}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {listing.askingPriceEur} € · {listing.area}
                </ThemedText>
              </ThemedView>
            ))
          )}
        </View>

        <View className="gap-2">
          <ThemedText type="smallBold">Kuljettajana</ThemedText>
          <PrimaryButton
            title="Vaihda kuljettajaksi"
            variant="secondary"
            onPress={() => setShowDriverNote((s) => !s)}
          />
          {showDriverNote && (
            <InfoNote tone="demo" title="Tulossa">
              Kuljettajatila (työt, aktiivinen keikka, ajokortin tarkistus) ei ole vielä käytössä —
              tämä on seuraava rakennettava osa.
            </InfoNote>
          )}
        </View>
      </ThemedView>
    </ScrollView>
  );
}
