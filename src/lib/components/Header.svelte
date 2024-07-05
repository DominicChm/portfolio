<script>
	import { siteTitle } from '$lib/config';
	import { navItems } from '$lib/config';
	import { base } from '$app/paths';
	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset'
	];
</script>

<div class="navbar fixed bg-base-100 z-[1000] flex justify-between">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="{base}/">{siteTitle}</a>
		<ul class="hidden menu menu-horizontal px-1 lg:flex">
			{#each navItems as nv}
				<li><a href={nv.route}>{nv.title}</a></li>
			{/each}
		</ul>
	</div>
	<div>
		Theme
		<select data-choose-theme class="select select-bordered ml-4">
			{#each themes as t}
				<option value={t}>{t}</option>
			{/each}
		</select>
	</div>

</div>
<div class="min-h-[72px] w-5/6"></div>
