<script>
	import { base } from '$app/paths';
	export let tags;
    export let size = ""
</script>

{#each tags as category}
	<a class="badge {size}" href="{base}/projects/category/{category}/">
		{category}
	</a>
{/each}
