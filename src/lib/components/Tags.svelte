<script>
	import { base } from '$app/paths';
	export let tags;
	export let size = '';
</script>

<div class="flex gap-2 flex-wrap">
	{#each tags as category}
		<a class="badge {size}" href="{base}/projects/category/{category}/">
			{category}
		</a>
	{/each}
</div>
