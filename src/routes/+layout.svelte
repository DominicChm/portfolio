<!-- This is the global layout file; it "wraps" every page on the site. (Or more accurately: is the parent component to every page component on the site.) -->
<script>
	import 'tailwindcss/tailwind.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { currentPage, isMenuOpen } from '../lib/assets/js/store.js';
	import { navItems } from '$lib/config';
	import { preloadCode } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { siteTitle, siteURL } from '$lib/config.js';
	import { themeChange } from 'theme-change';
	export let data;

	const transitionIn = { delay: 150, duration: 150 };
	const transitionOut = { duration: 100 };

	/**
	 * Updates the global store with the current path. (Used for highlighting
	 * the current page in the nav, but could be useful for other purposes.)
	 **/
	$: currentPage.set(data.path);

	/**
	 * This pre-fetches all top-level routes on the site in the background for faster loading.
	 * https://kit.svelte.dev/docs/modules#$app-navigation-preloaddata
	 *
	 * Any route added in src/lib/config.js will be preloaded automatically. You can add your
	 * own preloadData() calls here, too.
	 **/
	onMount(() => {
		const navRoutes = navItems.map((item) => item.route);
		preloadCode(...navRoutes);
		themeChange(false);
	});
</script>

<!--
	The below markup is used on every page in the site. The <slot> is where the page's
	actual contents will show up.
-->

<svelte:head>
	<script
		type="module"
		src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
	></script>
</svelte:head>

<Header />
{#key data.path}
	<main
		in:fade|global={transitionIn}
		out:fade|global={transitionOut}
		class="w-full max-w-5xl m-auto flex-1 p-8"
	>
		<slot />
	</main>
{/key}
<Footer />

<style>
	:global(body) {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		background-color: oklch(var(--b2)) !important;
	}

	:global(html) {
		height: 100%;
		min-height: 100%;
	}
</style>
