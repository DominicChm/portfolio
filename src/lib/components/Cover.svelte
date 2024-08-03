<script>
	export let post;
	export let controls = false;
	export let exposure = 0.5;

	let src = post.cover || '';
	let orientation = post.coverOrientation || '0deg -90deg -45deg';

	function setExposure(node, val) {
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
		use:setExposure={exposure}
		{src}
		{orientation}
		camera-controls={controls ? true : null}
		touch-action={'none'}
		auto-rotate
		auto-rotate-delay="500"
		rotation-per-second="20deg"
		poster={post.coverPoster}
		class="w-full pb-[100%] lg:h-full lg:pb-0"
	/>
{:else}
	<img {src} alt="cover" class="w-full h-full min-h-0 object-cover m-0" />
{/if}
