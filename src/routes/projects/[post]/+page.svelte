<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
	import { GithubLogo } from 'phosphor-svelte';
	export let data;
	import { base } from '$app/paths';
	import Tags from '$lib/components/Tags.svelte';
	import Cover from '$lib/components/Cover.svelte';

	const { title, excerpt, date, coverImage, categories, github } = data.meta;
	const { PostContent } = data;
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title}</title>
	<meta data-key="description" name="description" content={excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta name="twitter:description" content={excerpt} />
</svelte:head>

<article class="post prose w-full max-w-none">
	<!-- You might want to add an alt frontmatter attribute. If not, leaving alt blank here works, too. -->
	<div class="w-full h-[40vh] mb-8 rounded-t-xl overflow-hidden">
		<Cover post={data.meta}></Cover>
	</div>

	{#if categories}
		<div class="mb-4 flex gap-2 items-center">
			<Tags tags={categories} />

			<div class="flex-1 flex justify-end">
				{#if github}
					<a class="btn btn-primary" href={github}>
						Source <GithubLogo size={24}></GithubLogo>
					</a>
				{/if}
			</div>
		</div>
	{/if}

	<h1 class="mb-1">
		{title}
	</h1>
	<p class="mt-0">
		{date}
	</p>

	<div class="prose max-w-full w-full relative">
		<svelte:component this={PostContent} />
	</div>
</article>
