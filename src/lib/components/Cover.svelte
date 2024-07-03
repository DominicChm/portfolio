<script>
	export let post;

	let src = post.cover;
	let orientation = post.coverOrientation || '0deg -90deg -45deg';

	function exposure(node, val) {
		node.setAttribute('exposure', val);

		return {
			update: function (val) {
				node.setAttribute('exposure', val);
			}
		};
	}
</script>

{#if src.endsWith('gltf')}
	<model-viewer
		use:exposure={"0.5"}
		{src}
        {orientation}
		touch-action="none"
		auto-rotate
		auto-rotate-delay="500"
		rotation-per-second="20deg"
		poster={post.coverPoster}
		class="w-full pb-[100%] lg:h-full lg:pb-0"
	/>
{:else}
	<img {src} alt="cover" class="w-full h-full min-h-0 object-cover m-0" />
{/if}
