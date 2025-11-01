import { scopedPreflightStyles, isolateInsideOfContainer} from 'tailwindcss-scoped-preflight'

export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}", "./src/styles/**/*.{css,scss}", "./public/**/*.{html,js}"] ,
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer([".tw-class", "#tw-id"]),
    }),
  ],
  theme: {
    extend: {
      // Map shadcn colors to starlight css variables
      colors: {
          primary: {
            DEFAULT: 'var(--color-accent-600, #6a4d00)',
            200: 'var(--color-accent-200, #e5c484)',
            600: 'var(--color-accent-600, #6a4d00)',
            900: 'var(--color-accent-900, #422e00)',
            950: 'var(--color-accent-950, #302100)'
          },
          /* Foreground / text color for primary elements */
          'primary-foreground': 'var(--color-gray-100, #f9f5f3)',
          secondary: {
            DEFAULT: 'var(--color-gray-400, #97887e)'
          }
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  prefix: "",
  important: true,
};