import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StepProgressProps = {
  /** Zero-based index of the current step. */
  current: number;
  total: number;
  label?: string;
};

export function StepProgress({ current, total, label }: StepProgressProps) {
  const theme = useTheme();

  return (
    <View className="gap-2 self-stretch">
      <View className="flex-row gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ backgroundColor: i <= current ? Brand : theme.backgroundSelected }}
          />
        ))}
      </View>
      {label ? (
        <ThemedText type="small" themeColor="textSecondary">
          Step {current + 1} of {total} · {label}
        </ThemedText>
      ) : null}
    </View>
  );
}
