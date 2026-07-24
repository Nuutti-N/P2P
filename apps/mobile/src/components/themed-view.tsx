import { View, type ViewProps } from 'react-native';

export type ThemedViewType = 'background' | 'backgroundElement' | 'backgroundSelected';

export type ThemedViewProps = ViewProps & {
  type?: ThemedViewType;
  className?: string;
};

const TYPE_CLASSES: Record<ThemedViewType, string> = {
  background: 'bg-cream dark:bg-surface-dark',
  backgroundElement: 'bg-beige dark:bg-surface-dark-element',
  backgroundSelected: 'bg-beige-dark dark:bg-surface-dark-selected',
};

export function ThemedView({ className, type = 'background', ...rest }: ThemedViewProps) {
  return <View className={[TYPE_CLASSES[type], className].filter(Boolean).join(' ')} {...rest} />;
}
