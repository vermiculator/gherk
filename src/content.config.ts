import { defineCollection, reference, z} from 'astro:content';
import { glob } from 'astro/loaders';

import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { pageSiteGraphSchema } from 'starlight-site-graph/schema';

export const collections = {
	docs: defineCollection({ 
		loader: docsLoader(), 
		schema: docsSchema({
			extend: pageSiteGraphSchema
		}),
	}),
	about: defineCollection({ 
		loader: docsLoader(), 
		schema: docsSchema({
			extend: pageSiteGraphSchema
		}),
	}),
	earth: defineCollection({ 
		loader: docsLoader(), 
		schema: docsSchema({
			extend: z.object({
			  // Make a built-in field required instead of optional.
			  // description: z.string(),

			  // Add a new field to the schema.
			  garden: z.enum(['soil', 'seed', 'seedling', 'sprout', 'green']).optional(),
			  parent: z.array(reference('earth')).optional(),
			  peer: z.array(reference('earth')).optional(),
			  child: z.array(reference('earth')).optional(),
			}).merge(pageSiteGraphSchema),
		  }), 
	}),
	library: defineCollection({ 
		loader: docsLoader(), 
		schema: docsSchema({
			extend: z.object({
			  status: z.enum(['DORMANT', 'CURRENTLY', 'ARCHIVED']).optional(),
			  author: z.array(z.string()).optional(),
			  topics: z.array(reference('docs')).optional(),
			}).merge(pageSiteGraphSchema),
		  }), 
	}),
	siteMeta: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	vignettes: defineCollection({ 
		loader: glob({ pattern: ['**/*.md'], base: "./src/content/vignettes/data" }),
		schema: z.object({
			hide: z.boolean().optional(),
			format: z.enum(['image', 'text']),
			kind: reference('vignetteTypes'),
			image: z.object({
				src: z.string(),
				alt: z.string().optional(),
			}).optional(),
			title: z.string().optional(),
			caption: z.string().optional(),
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

	mediaTypes: defineCollection({ 
		loader: glob({ pattern: ['library-kinds.json'], base: "./src/data" }),
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
