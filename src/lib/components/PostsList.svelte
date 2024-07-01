<script>
	export let posts = [];
</script>

<div class="grid grid-cols-3 gap-10">
	{#each posts as post}
		<a class="hover-container" href="/projects/{post.slug}">
			<div class="card bg-base-100 shadow-xl">
				<figure>
					<img src={post.coverImage} alt="Shoes" />
				</figure>
				<div class="card-body">
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
		height: 30rem;
	}
	
	.card {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		transition-property: color top left right bottom box-shadow;
		transition-duration: 100ms;
	}
	
	.card:hover {
		background-color: oklch(var(--p));
		color: oklch(var(--pc));
		top: -.5rem;
		right: -.5rem;
		bottom: .5rem;
		left: .5rem;
		z-index: 100;
		box-shadow: -1rem 1rem oklch(var(--nc));
	}
</style>
