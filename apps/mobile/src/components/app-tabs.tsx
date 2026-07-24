import {
  TabList,
  TabListProps,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
  Tabs,
} from 'expo-router/ui';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ModeSwitch } from '@/components/mode-switch';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';

/**
 * One custom tab bar shared by web and native (no `NativeTabs`). The Figma
 * bottom bar is a flat, fully custom shape — OS-native tab chrome can't
 * reproduce it, and staying on one implementation avoids web/native drift.
 * Web is the priority target for now (see plan), so this is tuned for that
 * first.
 */
const TABS = [
  { name: 'index', href: '/', label: 'Etusivu', icon: { ios: 'house.fill', android: 'home', web: 'home' } },
  {
    name: 'explore',
    href: '/explore',
    label: 'Selaa',
    icon: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  },
  {
    name: 'sell',
    href: '/sell',
    label: 'Myy',
    icon: { ios: 'plus.circle.fill', android: 'add_circle', web: 'add_circle' },
  },
  {
    name: 'toimitukset',
    href: '/toimitukset',
    label: 'Toimitukset',
    icon: { ios: 'shippingbox.fill', android: 'local_shipping', web: 'local_shipping' },
  },
  {
    name: 'profiili',
    href: '/profiili',
    label: 'Profiili',
    icon: { ios: 'person.crop.circle.fill', android: 'person', web: 'person' },
  },
] as const satisfies { name: string; href: string; label: string; icon: SymbolViewProps['name'] }[];

export default function AppTabs() {
  return (
    // `Tabs`/`TabSlot` are expo-router/ui primitives, not NativeWind-styled
    // core components — they take `style`, not `className`.
    <Tabs style={{ flex: 1 }}>
      <View className="flex-1">
        <ModeSwitch />
        <TabSlot style={{ flex: 1 }} />
      </View>
      <TabList asChild>
        <BottomBar>
          {TABS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton icon={tab.icon} label={tab.label} />
            </TabTrigger>
          ))}
        </BottomBar>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  icon,
  label,
  isFocused,
  ...props
}: TabTriggerSlotProps & { icon: SymbolViewProps['name']; label: string }) {
  const color = isFocused ? '#FBF8F3' : 'rgba(251, 248, 243, 0.6)';

  // Explicit `style` (not `className`) — TabTrigger's `asChild` wrapper injects
  // its own `style` on this component, and an inline `style` always overrides a
  // `className` in NativeWind, so a Tailwind class here would be a no-op.
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        paddingVertical: Spacing.one,
      }}>
      <SymbolView tintColor={color} name={icon} size={22} />
      <ThemedText type="small" style={{ color, fontSize: 11, lineHeight: 14 }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function BottomBar({ children, ...props }: TabListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="absolute bottom-0 w-full items-center" style={{ pointerEvents: 'box-none' }}>
      <View
        {...props}
        className="w-full flex-row rounded-t-3xl bg-forest px-2 pt-2"
        style={{ maxWidth: MaxContentWidth, paddingBottom: Spacing.two + insets.bottom }}>
        {children}
      </View>
    </View>
  );
}
