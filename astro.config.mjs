// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import starlightObsidian from 'starlight-obsidian';
import starlightSiteGraph from 'starlight-site-graph';
import starlightScrollToTop from 'starlight-scroll-to-top';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://gherk.vercel.app',
  redirects: {
      //"/md/[...slug]": "/[...slug]",
      //"/earth/earth/[...slug]": "/earth/[...slug]"
  },

  integrations: [
  starlight({
      title: 'gherk',
      routeMiddleware: './src/routeData.ts',
      customCss: [
          './src/styles/custom.css',
          './src/styles/shadcn.css'
      ],
      social: [
          { icon: 'github', label: 'GitHub', href: 'https://github.com/vermiculator' },
          { icon: 'seti:html', label: 'Website', href: 'https://rowanlucas.github.io' },
      ],
     components: {
      Sidebar: './src/components/Sidebar.astro',
      PageSidebar: './src/components/PageSidebar.astro',
      },
      sidebar: [
          {
              label: 'earth',
              link: '/earth',
          },
          {
              label: 'library',
              link: '/library',
          },
          {
              label: 'vignettes',
              link: '/vignettes'
          },
          {
              label: 'mulch',
              link: '/mulch'
          },
      ],
      plugins: [
          starlightScrollToTop({
          // Button position
          position: 'right',
          showTooltip: false,
          // Use smooth scrolling
          smoothScroll: true,
          // Visibility threshold (show after scrolling 20% down)
          threshold: 20,
          // Customize the SVG icon
          svgPath: 'M25 42 12 29 42 29Z',
          svgStrokeWidth: 1,
          borderRadius: '50',
        }),
          starlightObsidian({
            vault: './src/content/vault',
            ignore: ['./*.md', '*/*.jpg', '*/*.png', '*/*.webp', 'id.md','.filenignore','.megaignore','*.acsm','LICENSE','*.txt','*.pdf','desktop.ini','./Rubbish','_.debris','.trash','./seeds', './private', './assets', './themes', './vignettes', './are.na'],
            output: 'md',
            copyFrontmatter: 'all',
            tableOfContentsOverview: 'title'
          }),
          starlightSiteGraph({
              debug: false,
              trackVisitedPages: 'disable',
              sitemapConfig: {
                  includeExternalLinks: true,
                  ignoreStarlightLinks: true,
                  linkInclusionRules: ["!https://read.readwise.io/read/*", "**/*"],
              },
              backlinksConfig: {},
              graphConfig: {
                  "depth": 2,
                  "depthDirection": "both",
                  "actions": [
                      "fullscreen",
                      "depth"
                  ],
                  "repelForce": 333,
                  "colliderPadding": 18,
                  "alphaDecay": 0.023,
                  "enableDrag": true,
                  "enablePan": true,
                  "enableZoom": true,
                  "enableHover": true,
                  "enableClick": "click",
                  "prefetchPages": true,
                  "renderUnresolved": true,
                  "renderArrows": true,
                  "renderExternal": true,
                  "nodeDefaultStyle": {
                      "shape": "circle",
                      "shapeSize": 4,
                      "shapeColor": "backgroundColor",
                      "strokeColor": "nodeColor",
                      "strokeWidth": 2,
                      "cornerType": "bevel",
                      "neighborScale": 0.4,
                    },
                  "linkWidth": 2,
                  "linkHoverWidth": 3,
                  "visibilityRules": [
                      "**/*"
                    ],

              },
          }),
        ]
       // .concat(process.env.CHECK_LINKS ? starlightLinksValidator() : []),
      }), react()],
  output: 'server',
  adapter: vercel(),
});