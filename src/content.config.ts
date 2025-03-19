import { defineCollection, reference, z} from 'astro:content';
import { glob } from 'astro/loaders';

import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	earth: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	library: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	siteMeta: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	swamp: defineCollection({ loader: docsLoader(), schema: docsSchema() }),

	vignettes: defineCollection({ 
		loader: glob({ pattern: ['**/*.md'], base: "./src/content/vignettes/data" }),
		schema: z.object({
			hide: z.boolean().optional(),
			kind: reference('vignetteTypes'),
			image: z.object({
				src: z.string(),
				alt: z.string().optional(),
			}),
			text: z.string().optional(),
			date: z.date().optional(), // YYYY-MM-DD
		}),
	}),

	////////////////// DATA ///////////////////////

	vignetteTypes: defineCollection({ 
		loader: glob({ pattern: ['vignette-kinds.json'], base: "./src/data" }),
		schema: z.array(
			z.object({
				title: z.string(),
			})
		),
	}),
	
	bookmarks: defineCollection({ 
		loader: glob({ pattern: ['bookmark-kinds.json'], base: "./src/data" }),
		schema: z.array(
			z.object({
				src: z.string(),
				title: z.string()
			})
		),
	}),

	////////////////////////////////////////////

	// add media collections?
};
