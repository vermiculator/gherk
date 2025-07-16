/** @type {import('tailwindcss').Config} */
import { scopedPreflightStyles, isolateInsideOfContainer} from 'tailwindcss-scoped-preflight'

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [/* 
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer([".tw-class", "#tw-id"]),
    }), */
  ],
  corePlugins: {
    preflight: false,
  },
  prefix: "tw-",
  important: true,
};