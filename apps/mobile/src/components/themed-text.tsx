import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: 'text' | 'textSecondary';
  className?: string;
};

const TYPE_CLASSES: Record<NonNullable<ThemedTextProps['type']>, string> = {
  default: 'text-base leading-6 font-medium',
  title: 'text-5xl leading-[52px] font-semibold',
  subtitle: 'text-3xl leading-[44px] font-semibold',
  small: 'text-sm leading-5 font-medium',
  smallBold: 'text-sm leading-5 font-bold',
  link: 'text-sm leading-[30px]',
  linkPrimary: 'text-sm leading-[30px] text-forest',
  code: 'font-mono text-xs',
};

const COLOR_CLASSES: Record<NonNullable<ThemedTextProps['themeColor']>, string> = {
  text: 'text-ink dark:text-ink-dark',
  textSecondary: 'text-ink-secondary dark:text-ink-dark-secondary',
};

export function ThemedText({ className, type = 'default', themeColor = 'text', ...rest }: ThemedTextProps) {
  // linkPrimary carries its own fixed brand color, independent of themeColor.
  const colorClass = type === 'linkPrimary' ? '' : COLOR_CLASSES[themeColor];

  return (
    <Text
      className={[TYPE_CLASSES[type], colorClass, className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}
