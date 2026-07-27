import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { NavBrand } from '@/constants/theme';

export type PrimaryButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  className?: string;
};

export function PrimaryButton({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  className,
  ...rest
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={[
        'min-h-12 items-center justify-center self-stretch rounded-full px-4 py-3',
        isPrimary ? 'bg-forest active:opacity-85' : 'bg-beige dark:bg-surface-dark-element active:opacity-85',
        isDisabled && 'opacity-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#ffffff' : NavBrand} />
      ) : (
        <ThemedText type="smallBold" style={isPrimary ? { color: '#ffffff' } : undefined}>
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}
