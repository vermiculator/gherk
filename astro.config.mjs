// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import wikiLinkPlugin from "@portaljs/remark-wiki-link";
import { getPermalinks } from "@portaljs/remark-wiki-link";

const permalinks = await getPermalinks("./src/content/");
// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [
          [wikiLinkPlugin, { 
            pathFormat: 'obsidian-short', 
            permalinks,
            // generate url of the linked page.
            // here `slug` would be "Page Name" for wiki link [[Page Name]].
            wikiLinkResolver: (/** @type {any} */ slug) => [slug] 
          }],
        ]
    },
    integrations: [starlight({
        title: 'gherk',
        social: {
            github: 'https://github.com/rowanlucas',
        },
        sidebar: [
            {
                label: 'earth',
                autogenerate: { directory: 'earth' },
            },
            {
                label: 'library',
                autogenerate: { directory: 'library' },
            },
            {
                label: 'swamp',
                autogenerate: { directory: 'swamp' },
            },
        ],
		}), react()],
});