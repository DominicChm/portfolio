<script>
	import { base } from '$app/paths';
	import Tags from './Tags.svelte';
	export let posts = [];
</script>

<div class="grid grid-cols-3 gap-10">
	{#each posts as post}
		<a class="hover-container" href="{base}/projects/{post.slug}">
			<div class="card bg-base-100 shadow-xl">
				<figure>
					<img src="{base}{post.coverImage}" alt="Shoes" />
				</figure>
				<div class="card-body">
					<div class="flex gap-2 w-full flex-wrap">
						<Tags tags={post.categories} />
					</div>

					<h2 class="card-title">{post.title}</h2>
					<p>{post.excerpt}</p>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.hover-container {
		position: relative;
	}


	.card {
		transition-property: color top left right bottom box-shadow;
		transition-duration: 100ms;
		height: 100%;
	}

	.card:hover {
		transform: translate(.5rem, -.5rem);
		background-color: oklch(var(--p));
		color: oklch(var(--pc));
		z-index: 100;
		box-shadow: -1rem 1rem oklch(var(--nc));
	}
</style>
