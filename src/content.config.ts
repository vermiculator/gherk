import { defineCollection, reference, z} from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { pageSiteGraphSchema } from 'starlight-site-graph/schema';

export const collections = {
	structural: defineCollection({ 
        loader: glob({ pattern: "**/*.md", base: "./src/content/docs/docs/structural" }),
		 schema: docsSchema({
			extend: pageSiteGraphSchema,
		  }), 
	}),
	docs: defineCollection({ 
        loader: glob({ pattern: "{*.md,about/**/*.md,meta-thesis/**/*.md}", base: "./src/content/docs/docs" }),
		 schema: docsSchema({
			extend: z.object({
			  prev: z.union([z.array(reference('docs')), z.boolean()]).optional(),
			  next: z.union([z.array(reference('docs')), z.boolean()]).optional(),
			  parent: z.array(reference('docs')).optional(),
			  peer: z.array(reference('docs')).optional(),
			  child: z.array(reference('docs')).optional(),
		    }).merge(pageSiteGraphSchema),
		  }), 
	}),
	thesis: defineCollection({ 
        loader: glob({ pattern: "**/*.md", base: "./src/content/docs/docs/thesis" }),
		 schema: docsSchema({
			extend: z.object({
			  prev: z.union([z.array(reference('thesis')), z.boolean()]).optional(),
			  next: z.union([z.array(reference('thesis')), z.boolean()]).optional(),
			  parent: z.array(z.union([reference('docs'), reference('earth'), reference('thesis')])).optional(),
			}).merge(pageSiteGraphSchema),
		  }), 
	}),
	earth: defineCollection({ 
            loader: glob({ pattern: "**/*.md", base: "./src/content/docs/earth" }),
		     schema: docsSchema({
		    	extend: z.object({
			  parent:  z.array(z.union([reference('docs'), reference('earth'), reference('thesis')])).optional(),
			  peer:  z.array(z.union([reference('docs'), reference('earth'), reference('thesis')])).optional(),
			  child:  z.array(z.union([reference('docs'), reference('earth'), reference('thesis')])).optional(),
			  instanceOf:  z.array(z.union([reference('structural'), reference('earth')])).optional(),
			  instances: z.array(z.union([reference('structural'), reference('earth')])).optional(),
			  caveats: z.array(z.union([reference('structural'), reference('earth')])).optional(),
			  prev: z.array(z.union([reference('docs'), reference('library'), reference('earth'), reference('thesis')])).optional(),
			  next: z.array(z.union([reference('docs'), reference('library'), reference('earth'), reference('thesis')])).optional(),
			//   links: z.array(z.union([reference('docs'), reference('library'), reference('earth'), reference('thesis')])).optional(),
			//   backlinks: z.union([z.array(z.union([reference('docs'), reference('library'), reference('earth'), reference('thesis')])), z.boolean()]).optional(),
			}).merge(pageSiteGraphSchema),
		  }), 
	}),
	library: defineCollection({ 
            loader: glob({ pattern: "**/*.md", base: "./src/content/docs/library" }),
		    schema: docsSchema({
			extend: z.object({
			  status: z.enum(['DORMANT', 'CURRENTLY', 'ARCHIVED']).optional(),
			  author: z.array(z.string()).optional(),
			  topics: z.array(reference('earth')).optional(),
			}).merge(pageSiteGraphSchema),
		  }), 
	}),
	vignettes: defineCollection({ 
		loader: glob({ pattern: ['**/*.md'], base: "./src/content/vignettes/data" }),
		schema: z.object({
			hide: z.boolean().optional(),
			appearOn:z.array(z.string()).optional(),
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
	mulch: defineCollection({ 
		loader: glob({ pattern: ['**/*.md'], base: "./src/content/mulch/data" }),
		schema: z.object({
			format: z.enum(['image', 'video']),
			kind: z.enum(['col', 'mono']),
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
