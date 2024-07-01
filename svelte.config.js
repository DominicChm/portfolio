import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { phosphorSvelteOptimize } from "phosphor-svelte/preprocessor"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Ensures both .svelte and .md files are treated as components (can be imported and used anywhere, or used as pages)
	extensions: ['.svelte', '.md'],

	preprocess: [
		phosphorSvelteOptimize(),
		vitePreprocess(),
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md'],

			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			rehypePlugins: [
				rehypeSlug,
				rehypeAutolinkHeadings,
			],
		}),
	],

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: false
		}),
		// prerender: {
		// 	entries: [
		// 		'*',
		// 		// '/projects/category/*/page/*',
		// 		// '/projects/category/page/',
		// 		// '/projects/category/page/*',
		// 		// '/projects/page/',
		// 		// '/projects/page/*',
		// 	]
		// }
	}
};

export default config;
