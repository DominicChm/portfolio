<script>
	import { siteTitle } from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{siteTitle}</title>
</svelte:head>

<main class="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center p-8 box-border overflow-hidden">
	<div class="absolute gradient"></div>
	<div class="card bg-base-100 w-[48rem] shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Hi there!</h2>
			<p>
				I'm Dominic! I'm a Cal Poly SLO graduate with a B.S. in Mechanical Engineering, a minor in
				Computer Science, and self-taught knowledge in Electrical Engineering. I'm a
				jack-of-all-trades with a passion for all. Feel free to browse around my projects!
			</p>
			<div class="card-actions justify-end">
				<a class="btn btn-secondary" href="/projects/category">All Categories</a>
				<a class="btn btn-primary" href="/projects">All Projects</a>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.gradient {
  --size: 750px;
  --speed: 50s;
  --easing: cubic-bezier(0.8, 0.2, 0.2, 0.8);

  width: var(--size);
  height: var(--size);
  filter: blur(calc(var(--size) / 5));
  background-image: linear-gradient(oklch(var(--a)), oklch(var(--p)));
  animation: rotate var(--speed) var(--easing) alternate infinite;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

@media (min-width: 720px) {
  .gradient {
    --size: 1000px;
  }
}

/* This is just to transition when you change the viewport size. */
* {
  transition: all 0.5s ease-out;
}

</style>
