import { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InfoNote } from '@/components/form/info-note';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';

/**
 * Persistent buyer/seller <-> driver mode toggle (Airbnb-style: one app, one
 * login, a small always-visible switch — not two separate apps).
 *
 * Driver mode doesn't exist yet (phase two), so "Kuljettajana" stays visually
 * present but never actually switches — tapping it explains that honestly
 * instead of dead-ending or pretending to switch.
 */
export function ModeSwitch() {
  const insets = useSafeAreaInsets();
  const [showDriverNote, setShowDriverNote] = useState(false);

  const paddingTop = Platform.OS === 'web' ? Spacing.four : insets.top + Spacing.two;

  return (
    <View className="flex-row justify-center px-4 pb-2" style={{ paddingTop }}>
      <View className="w-full items-center" style={{ maxWidth: MaxContentWidth }}>
        <View className="flex-row self-center rounded-full bg-beige p-1 dark:bg-surface-dark-element">
          <View className="rounded-full bg-forest px-4 py-2">
            <ThemedText type="small" style={{ color: '#FBF8F3' }}>
              Ostajana / myyjänä
            </ThemedText>
          </View>
          <Pressable
            className="rounded-full px-4 py-2"
            accessibilityRole="button"
            onPress={() => setShowDriverNote((s) => !s)}>
            <ThemedText type="small" themeColor="textSecondary">
              Kuljettajana
            </ThemedText>
          </Pressable>
        </View>
        {showDriverNote && (
          <View className="mt-2 self-stretch">
            <InfoNote tone="demo" title="Tulossa">
              Kuljettajatila ei ole vielä käytössä — rakennamme sen seuraavaksi.
            </InfoNote>
          </View>
        )}
      </View>
    </View>
  );
}
