/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}', './src/features/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // Dark mode is off for now — nothing ever applies a "dark" class, so every
  // `dark:` utility in the app stays inert and light is forced everywhere.
  // Flip back to 'media' (the Tailwind default) to resume following the
  // system color scheme once dark mode is actually designed against the
  // Metsä palette.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Metsä palette — see docs/syce-first-steps.md and the Figma handoff spec.
        // Brand/nav colors stay constant across light/dark; surfaces flip via `dark:`.
        cream: '#FBF8F3',
        beige: '#ECE4D9',
        'beige-dark': '#DFD3C3',
        forest: '#1B4433',
        terracotta: '#A85D3F',
        ink: '#1C1C18',
        'ink-secondary': '#6B6459',
        'surface-dark': '#14201A',
        'surface-dark-element': '#1E2C24',
        'surface-dark-selected': '#28392F',
        'ink-dark': '#F5F1E8',
        'ink-dark-secondary': '#B7B0A2',
        'trust-bg': '#DCF0E1',
        'trust-text': '#16A34A',
      },
    },
  },
  plugins: [],
};
