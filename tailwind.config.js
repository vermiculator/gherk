import { scopedPreflightStyles, isolateInsideOfContainer} from 'tailwindcss-scoped-preflight'

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer([".tw-class", "#tw-id"]),
    }),
  ],
  corePlugins: {
    preflight: true,
  },
  prefix: "",
  important: true,
};