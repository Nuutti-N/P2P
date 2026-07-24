import { SymbolView } from 'expo-symbols';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { TrustBadge } from '@/constants/theme';
import type { SellerListing } from '@/features/sell/types';
import { useTheme } from '@/hooks/use-theme';

export function ListingCard({
  listing,
  onPress,
}: {
  listing: SellerListing;
  onPress: () => void;
}) {
  const theme = useTheme();
  const { vehicle } = listing;

  return (
    <Pressable accessibilityRole="button" onPress={onPress} className="active:opacity-85">
      <View className="overflow-hidden rounded-2xl bg-cream dark:bg-surface-dark">
        <View className="aspect-video items-center justify-center bg-beige dark:bg-surface-dark-element">
          <SymbolView
            tintColor={theme.textSecondary}
            name={{ ios: 'car.fill', android: 'directions_car', web: 'directions_car' }}
            size={32}
          />
        </View>
        <View className="gap-1 p-4">
          <View className="flex-row justify-between gap-2">
            <ThemedText type="smallBold" className="flex-1">
              {vehicle.make} {vehicle.model} {vehicle.year}
            </ThemedText>
            <ThemedText type="smallBold">{listing.askingPriceEur} €</ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {vehicle.mileageKm ? `${Number(vehicle.mileageKm).toLocaleString('fi-FI')} km · ` : ''}
            {listing.area}
          </ThemedText>
          {listing.identityVerified && (
            <View className="mt-1 flex-row items-center gap-1 self-start rounded-full bg-trust-bg px-2 py-0.5">
              <SymbolView
                tintColor={TrustBadge.text}
                name={{ ios: 'checkmark.shield.fill', android: 'verified', web: 'verified' }}
                size={12}
              />
              <ThemedText type="small" style={{ color: TrustBadge.text }}>
                Vahvistettu myyjä
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
