<script>
	import { base } from '$app/paths';
	import Tags from './Tags.svelte';
	import Cover from './Cover.svelte';
	export let posts = [];
</script>

<div class="grid lg:grid-cols-3 gap-10">
	{#each posts as post}
		<a class="hover-container" href="{base}/projects/{post.slug}">
			<div
				class="card bg-base-100 shadow-xl overflow-hidden min-h-96"
				class:important={post.categories && post.categories.includes('highlight')}
			>
				<Cover {post}></Cover>
				<div class="card-body">
					<div class="flex gap-2 w-full flex-wrap">
						<Tags tags={post.categories || []} />
					</div>

					<h2 class="card-title">{post.title || ""}</h2>
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
		transform: translate(0.5rem, -0.5rem);
		background-color: oklch(var(--p));
		color: oklch(var(--pc));
		z-index: 100;
		box-shadow: -1rem 1rem oklch(var(--nc));
	}

	.important {
		border: 3px solid oklch(var(--a));
	}

	a {
		text-decoration: none;
	}

	h2,
	p {
		color: inherit;
		font-weight: normal;
		margin: 0;
	}

	h2 {
		font-weight: bold;
	}
</style>
