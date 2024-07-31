<script>
	import PostsList from '$lib/components/PostsList.svelte'
	import Pagination from '$lib/components/Pagination.svelte'
	import { siteDescription } from '$lib/config'

	export let data
</script>


<svelte:head>
	<title>Projects</title>
	<meta data-key="description" name="description" content={siteDescription}>
</svelte:head>

<a class="link text-right w-full block mb-2" href="/portfolio/projects/category">All Categories</a>

<PostsList posts={data.posts} />