import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/form/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { getListings } from '@/features/sell/store';
import type { SellerListing } from '@/features/sell/types';
import { useTheme } from '@/hooks/use-theme';

import { ListingCard } from './listing-card';
import { ListingDetail } from './listing-detail';

const AREA_FILTERS = ['Kaikki', 'Mikkeli', 'Helsinki'] as const;
const PRICE_FILTERS = [
  { label: 'Kaikki hinnat', max: Infinity },
  { label: 'Alle 12 000 €', max: 12000 },
  { label: 'Alle 20 000 €', max: 20000 },
] as const;

export function BrowseFeed({
  variant = 'browse',
  initialFiltersOpen = false,
}: {
  variant?: 'home' | 'browse';
  initialFiltersOpen?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(initialFiltersOpen);
  const [area, setArea] = useState<(typeof AREA_FILTERS)[number]>('Kaikki');
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [selected, setSelected] = useState<SellerListing | null>(null);

  const listings = getListings();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      const matchesQuery =
        q === '' ||
        `${l.vehicle.make} ${l.vehicle.model} ${l.area}`.toLowerCase().includes(q);
      const matchesArea = area === 'Kaikki' || l.area === area;
      const matchesPrice = Number(l.askingPriceEur || 0) <= maxPrice;
      return matchesQuery && matchesArea && matchesPrice;
    });
  }, [listings, query, area, maxPrice]);

  const contentPadding = {
    paddingTop: Platform.OS === 'web' ? Spacing.four : Spacing.two,
    paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
  };

  return (
    <>
      <ScrollView
        className="flex-1 bg-cream dark:bg-surface-dark"
        contentContainerClassName="flex-row justify-center px-4"
        contentContainerStyle={contentPadding}
        keyboardShouldPersistTaps="handled">
        <ThemedView className="w-full gap-3" style={{ maxWidth: MaxContentWidth }}>
          {variant === 'home' ? (
            <View className="gap-1">
              <ThemedText type="title" className="text-[28px] leading-8">
                Syce
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Osta ja myy auto turvallisesti — kuljettaja hoitaa toimituksen puolestasi.
              </ThemedText>
            </View>
          ) : (
            <ThemedText type="title" className="text-[28px] leading-8">
              Selaa autoja
            </ThemedText>
          )}

          <View className="flex-row gap-2">
            <ThemedView type="backgroundElement" className="flex-1 justify-center rounded-full px-4">
              <SearchInput value={query} onChangeText={setQuery} />
            </ThemedView>
            <Pressable
              accessibilityRole="button"
              onPress={() => setFiltersOpen((v) => !v)}
              className="active:opacity-85">
              <ThemedView type="backgroundElement" className="justify-center rounded-full px-4">
                <ThemedText type="small">Suodattimet</ThemedText>
              </ThemedView>
            </Pressable>
          </View>

          {filtersOpen && (
            <View className="gap-2">
              <FilterRow label="Sijainti">
                {AREA_FILTERS.map((a) => (
                  <Chip key={a} label={a} active={area === a} onPress={() => setArea(a)} />
                ))}
              </FilterRow>
              <FilterRow label="Hinta">
                {PRICE_FILTERS.map((p) => (
                  <Chip
                    key={p.label}
                    label={p.label}
                    active={maxPrice === p.max}
                    onPress={() => setMaxPrice(p.max)}
                  />
                ))}
              </FilterRow>
            </View>
          )}

          <View className="gap-3">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onPress={() => setSelected(listing)} />
            ))}
            {filtered.length === 0 && listings.length === 0 && (
              <EmptyState onSell={() => router.push('/sell')} />
            )}
            {filtered.length === 0 && listings.length > 0 && (
              <ThemedText themeColor="textSecondary">Ei tuloksia näillä hakuehdoilla.</ThemedText>
            )}
          </View>
        </ThemedView>
      </ScrollView>
      <ListingDetail listing={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function EmptyState({ onSell }: { onSell: () => void }) {
  const theme = useTheme();
  return (
    <View className="items-center gap-3 rounded-2xl bg-beige px-4 py-10 dark:bg-surface-dark-element">
      <View className="h-14 w-14 items-center justify-center rounded-full bg-beige-dark dark:bg-surface-dark-selected">
        <SymbolView
          tintColor={theme.textSecondary}
          name={{ ios: 'car.2.fill', android: 'directions_car', web: 'directions_car' }}
          size={26}
        />
      </View>
      <View className="items-center gap-1">
        <ThemedText type="smallBold" className="text-center">
          Ei vielä ilmoituksia
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" className="max-w-[280px] text-center">
          Syce on juuri alkamassa Mikkeli–Helsinki-alueella. Ole ensimmäinen, joka listaa autonsa.
        </ThemedText>
      </View>
      <PrimaryButton title="Lisää autosi myyntiin" onPress={onSell} className="self-stretch" />
    </View>
  );
}

function SearchInput({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (t: string) => void;
}) {
  const theme = useTheme();
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Hae automerkkiä, mallia tai sijaintia"
      placeholderTextColor={theme.textSecondary}
      className="py-2 text-base text-ink dark:text-ink-dark"
    />
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-1">
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <View className="flex-row flex-wrap gap-1">{children}</View>
    </View>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const theme = useTheme();

  // Active state inverts text/background — an inline style avoids relying on
  // Tailwind class-conflict resolution (which isn't ordered by JSX position).
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View
        className="rounded-full px-4 py-1"
        style={{ backgroundColor: active ? theme.text : theme.backgroundElement }}>
        <ThemedText type="small" style={{ color: active ? theme.background : theme.text }}>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
}
