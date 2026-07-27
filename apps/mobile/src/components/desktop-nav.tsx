import { useRouter } from 'expo-router';
import type { TabListProps, TabTriggerSlotProps } from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand, NavBrand } from '@/constants/theme';
import { useContentMaxWidth } from '@/hooks/use-desktop-layout';
import { useTheme } from '@/hooks/use-theme';

/**
 * Wide-viewport nav bar — swapped in for the mobile bottom tab bar above the
 * desktop breakpoint (see useIsDesktopWeb). Renders in normal document flow
 * (unlike BottomBar, which is absolutely positioned to pin to the bottom),
 * so page content simply starts below it — no manual offset needed.
 *
 * Color is deliberately restrained here (logo + the one primary action),
 * matching the reference apps rather than the app's own bottom tab bar,
 * which stays solid forest — a native tab bar and a desktop nav are
 * different conventions, not the same chrome at two sizes.
 */
export function TopNavBar({ children, ...props }: TabListProps) {
  const maxWidth = useContentMaxWidth();

  return (
    <View
      {...props}
      className="w-full flex-row items-center justify-center border-b border-beige-dark bg-cream px-6 dark:border-surface-dark-selected dark:bg-surface-dark"
      style={{ height: 72 }}>
      <View className="w-full flex-1 flex-row items-center gap-5" style={{ maxWidth }}>
        {children}
      </View>
    </View>
  );
}

export function NavLogoLink(props: TabTriggerSlotProps) {
  return (
    <Pressable {...props} accessibilityRole="link" className="flex-row items-center">
      <ThemedText type="title" className="text-[21px]" style={{ color: NavBrand }}>
        Syce
      </ThemedText>
    </Pressable>
  );
}

export function NavTextLink({
  label,
  isFocused,
  ...props
}: TabTriggerSlotProps & { label: string }) {
  return (
    <Pressable {...props} accessibilityRole="link" className="px-1 py-2">
      <ThemedText
        type="smallBold"
        style={isFocused ? { textDecorationLine: 'underline' } : undefined}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export function NavAvatarLink({ isFocused, ...props }: TabTriggerSlotProps) {
  const theme = useTheme();

  return (
    <Pressable
      {...props}
      accessibilityRole="link"
      className="h-9 w-9 items-center justify-center rounded-full border border-beige-dark dark:border-surface-dark-selected"
      style={isFocused ? { borderColor: NavBrand, borderWidth: 1.5 } : undefined}>
      <SymbolView
        tintColor={theme.textSecondary}
        name={{ ios: 'person.crop.circle.fill', android: 'person', web: 'person' }}
        size={18}
      />
    </Pressable>
  );
}

/**
 * Real search, not decorative — submitting navigates to /explore with the
 * query as a param; BrowseFeed reads it back out to initialise its own
 * search field. A search box that didn't actually do anything would be
 * exactly the kind of dishonest control the project rules ban.
 */
export function NavSearchBox() {
  const router = useRouter();
  const theme = useTheme();
  const [text, setText] = useState('');

  function submit() {
    router.push({ pathname: '/explore', params: { q: text.trim() } });
  }

  return (
    <View
      className="mx-1 flex-1 flex-row items-center gap-2 rounded-full border border-beige-dark bg-beige py-1 pl-4 pr-1 dark:border-surface-dark-selected dark:bg-surface-dark-element"
      style={{ maxWidth: 420 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        onSubmitEditing={submit}
        placeholder="Hae automerkkiä, mallia tai sijaintia"
        placeholderTextColor={theme.textSecondary}
        returnKeyType="search"
        className="flex-1 text-sm text-ink dark:text-ink-dark"
      />
      <Pressable
        accessibilityRole="button"
        onPress={submit}
        className="h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: Brand }}>
        <SymbolView
          tintColor="#FBF8F3"
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          size={14}
        />
      </Pressable>
    </View>
  );
}
