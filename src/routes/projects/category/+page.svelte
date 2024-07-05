<script>
	import { base } from '$app/paths';

	export let data;
	const { uniqueCategories } = data;
</script>

<svelte:head>
	<title>Blog | Categories</title>
</svelte:head>

<div class="prose">
	<h1 class="h2">All categories</h1>

	<ul>
		{#each uniqueCategories as category}
			<li>
				<a href="{base}/projects/category/{category.title}">
					{category.title}
				</a>
				({category.count})
			</li>
		{/each}
	</ul>
</div>
