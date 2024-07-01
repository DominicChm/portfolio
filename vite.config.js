import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['.']
		}
	},
	optimizeDeps: {
		exclude: ["phosphor-svelte"],
	},
	base: "/portfolio/"
};

export default config
