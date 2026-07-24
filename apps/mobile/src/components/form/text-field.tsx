import { TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export type TextFieldProps = TextInputProps & {
  label: string;
  hint?: string;
};

export function TextField({ label, hint, className, ...rest }: TextFieldProps) {
  const theme = useTheme();

  return (
    <View className="gap-1 self-stretch">
      <ThemedText type="smallBold">{label}</ThemedText>
      <TextInput
        placeholderTextColor={theme.textSecondary}
        className={[
          'rounded-xl border border-beige-dark bg-beige px-4 py-2 text-base text-ink dark:border-surface-dark-selected dark:bg-surface-dark-element dark:text-ink-dark',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      {hint ? (
        <ThemedText type="small" themeColor="textSecondary">
          {hint}
        </ThemedText>
      ) : null}
    </View>
  );
}
