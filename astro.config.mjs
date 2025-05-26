// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';
import starlightSiteGraph from 'starlight-site-graph';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'gherk',
        customCss: [
            './src/styles/custom.css',
        ],
        social: [
            { icon: 'github', label: 'GitHub', href: 'https://github.com/rowanlucas' },
        ],
        sidebar: [
            {
                label: 'earth',
                collapsed: true,
                autogenerate: { directory: 'earth' },
            },
            {
                label: 'library',
                collapsed: true,
                autogenerate: { directory: 'library' },
            },
            {
                label: 'vignettes',
                link: '/vignettes'
            },
        ],
        plugins: [
            starlightObsidian({
              vault: './src/content/vault',
              ignore: ['./*.md', 'id.md','.filenignore','.megaignore','*.acsm','LICENSE','*.txt','*.pdf','desktop.ini','./Rubbish','_.debris','.trash','./seeds', './private', './assets', './themes', './vignettes'],
              output: '',
              autoLinkHeadings: true,
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
                    "prefetchPages": false,
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
          //.concat(process.env.CHECK_LINKS ? starlightLinksValidator() : []),
		}), react()],
});