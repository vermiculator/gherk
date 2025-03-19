// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
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