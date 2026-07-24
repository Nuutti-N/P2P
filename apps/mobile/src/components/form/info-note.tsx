import type { ReactNode } from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { NavBrand } from '@/constants/theme';

export type InfoNoteProps = {
  children: ReactNode;
  /**
   * 'info'  — neutral explainer (e.g. "the driver is included").
   * 'demo'  — flags placeholder/not-yet-real behaviour so we never imply a
   *           mock is a real check.
   */
  tone?: 'info' | 'demo';
  title?: string;
};

export function InfoNote({ children, tone = 'info', title }: InfoNoteProps) {
  const accent = tone === 'demo' ? '#B5651D' : NavBrand;

  return (
    <View
      className="gap-1 self-stretch rounded-lg border-l-[3px] bg-beige px-4 py-2 dark:bg-surface-dark-element"
      style={{ borderLeftColor: accent }}>
      {title ? (
        <ThemedText type="smallBold" style={{ color: accent }}>
          {title}
        </ThemedText>
      ) : null}
      <ThemedText type="small" themeColor="textSecondary">
        {children}
      </ThemedText>
    </View>
  );
}
