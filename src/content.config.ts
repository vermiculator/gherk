import { defineCollection, reference, z} from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
//import { inruptSolidPodLoader } from '../src/loaders/solid';
import { pageSiteGraphSchema } from 'starlight-site-graph/schema';

const anyDoc = z.union([reference('structural'), reference('docs'), reference('about'), reference('thesis'), reference('metaThesis'), reference('thesisParts'), reference('earth'), reference('library')]);

const generalSchema = docsSchema({
		    	extend: z.object({
			  parent:  z.array(anyDoc).optional(),
			  peer:  z.array(anyDoc).optional(),
			  child:  z.array(anyDoc).optional(),
			  instanceOf:  z.array(anyDoc).optional(),
			  instances: z.array(anyDoc).optional(),
			  caveats: z.array(anyDoc).optional(),
			  backwards: z.array(anyDoc).optional(),
			  forwards: z.array(anyDoc).optional(),
			}).merge(pageSiteGraphSchema),
		  });

export const collections = {
	structural: defineCollection({
        loader: glob({ pattern: ['**/*.md'], base: "./src/content/docs/md/plain/structural" }),
		  schema: generalSchema
	}),
	docs: defineCollection({
        loader: glob({ pattern: ['**/*.mdx', '**/*.md'], base: "./src/content/docs/md" }),
		  schema: generalSchema
	}),
	about: defineCollection({
        loader: glob({ pattern: ['**/*.md'], base: "./src/content/docs/md/plain/about/" }),
		 schema: generalSchema
	}),
	thesis: defineCollection({
        loader: glob({ pattern: ['*.md'], base: "./src/content/docs/md/plain/thesis" }),
		  schema: generalSchema
	}),
	metaThesis: defineCollection({
        loader: glob({ pattern: ['**/*.md'], base: "./src/content/docs/md/plain/meta-thesis" }),
		  schema: generalSchema
	}),
	thesisParts: defineCollection({
            loader: glob({ pattern: ['**/*.md'], base: "./src/content/docs/md/plain/thesis/parts" }),
		  schema: generalSchema
	}),
	earth: defineCollection({
            loader: glob({ pattern: ['**/*.md'], base: "./src/content/docs/md/earth" }),
		  schema: generalSchema
	}),
	library: defineCollection({
            loader: glob({ pattern: ['**/*.md'], base: "./src/content/docs/md/library" }),
		    schema: docsSchema({
			extend: z.object({
			  status: z.enum(['DORMANT', 'CURRENTLY', 'ARCHIVED']).optional(),
			  author: z.array(z.string()).optional(),
			  topics: z.array(anyDoc).optional(),
			}).merge(pageSiteGraphSchema),
		  }),
	}),


	////////////////// DATA ///////////////////////

	/* solidcontent: defineCollection({
		loader: inruptSolidPodLoader,
		schema: z.object({
			id: z.string().optional(),
			title: z.string().optional(),
		}),
	}), */

	vignettes: defineCollection({
		loader: glob({ pattern: ['**/*.md'], base: "./src/data/vignettes" }),
		schema: z.object({
			hide: z.boolean().optional(),
			appearOn:z.array(z.string()).optional(),
			format: z.enum(['image', 'text']),
			kind: z.enum(['body', 'photo', 'portrait', 'person', 'nature', 'illu', 'creature', 'writing', 'poem', 'painting', 'sketch', 'misc']),
			url: z.string().optional(),
			alt: z.string().optional(),
			title: z.string().optional(),
			caption: z.string().optional(),
			date: z.date().optional(), // YYYY-MM-DD
		}),
	}),
	mulch: defineCollection({
		loader: glob({ pattern: ['**/*.md'], base: "./src/data/mulch" }),
		schema: z.object({
			type: z.string(),
			kind: z.enum(['col', 'mono']),
			url: z.string(),
			alt: z.string().optional(),
			title: z.string().optional(),
			caption: z.string().optional(),
			date: z.date().optional(), // YYYY-MM-DD
		}),
	}),
	works: defineCollection({
		loader: glob({ pattern: ['**/*.md'], base: "./src/data/works" }),
		schema: z.object({
			format: z.enum(['image', 'video']),
			kind: z.enum(['col', 'mono']),
			url: z.string(),
			alt: z.string().optional(),
			title: z.string().optional(),
			caption: z.string().optional(),
			date: z.date().optional(), // YYYY-MM-DD
		}),
	}),
	////////////////// TYPES ///////////////////////

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

	////////////////// MISC ///////////////////////

	pinnedItems: defineCollection({
		loader: glob({ pattern: ['pinned-items.json'], base: "./src/data" }),
		schema: z.array(
			z.object({
				slug: z.string(),
			})
		),
	}),

	////////////////////////////////////////////

};
