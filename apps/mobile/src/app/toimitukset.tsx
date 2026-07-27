import { Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InfoNote } from '@/components/form/info-note';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useContentMaxWidth } from '@/hooks/use-desktop-layout';

/**
 * Toimitukset — the differentiator: buyer + seller both follow where the car
 * is during delivery. No real delivery exists yet (no driver matching, no
 * live tracking, no Traficom check), so this is an honest empty state, not a
 * populated mock — a fabricated driver/checklist would read as a fake
 * testimonial, which the product rules explicitly ban.
 */
export default function ToimituksetScreen() {
  const insets = useSafeAreaInsets();
  const contentMaxWidth = useContentMaxWidth();

  const contentPadding = {
    paddingTop: Platform.OS === 'web' ? Spacing.four : Spacing.two,
    paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
  };

  return (
    <ScrollView
      className="flex-1 bg-cream dark:bg-surface-dark"
      contentContainerClassName="flex-row justify-center px-4"
      contentContainerStyle={contentPadding}>
      <ThemedView className="w-full gap-3" style={{ maxWidth: contentMaxWidth }}>
        <ThemedText type="subtitle">Toimitukset</ThemedText>

        <View className="items-center gap-2 rounded-2xl bg-beige px-4 py-8 dark:bg-surface-dark-element">
          <ThemedText type="smallBold" className="text-center">
            Ei aktiivisia toimituksia
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" className="text-center">
            Kun kauppa etenee ja kuljettaja on sovittu, näet täältä toimituksen tilan.
          </ThemedText>
        </View>

        <InfoNote tone="info" title="Pilotissa vielä käsin">
          Syce on juuri alkamassa. Kaksi perustajaa sopivat noudot ja toimitukset tällä hetkellä
          käsin Mikkeli–Helsinki-alueella. Reaaliaikainen seuranta rakennetaan sitä mukaa kun
          oikeita toimituksia on tehty.
        </InfoNote>
      </ThemedView>
    </ScrollView>
  );
}
