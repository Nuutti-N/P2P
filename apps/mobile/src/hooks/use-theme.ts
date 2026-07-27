import { Colors } from '@/constants/theme';

/**
 * Dark mode is off for now (see tailwind.config.js) — hardcode light here too
 * so JS-computed colors (icon tints, placeholder text, etc.) stay in sync
 * with the Tailwind `dark:` classes that are already inert.
 */
export function useTheme() {
  return Colors.light;
}
