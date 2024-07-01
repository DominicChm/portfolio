<script>
	import { siteTitle } from '$lib/config';
	import { navItems } from '$lib/config';
	import {base} from "$app/paths"
	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
</script>

<div class="navbar fixed bg-base-100 z-50">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="{base}/">{siteTitle}</a>
		<ul class="hidden menu menu-horizontal px-1 lg:flex">
			{#each navItems as nv}
				<li><a href={nv.route}>{nv.title}</a></li>
			{/each}			
		</ul>
	</div>
</div>
<div class="min-h-[72px] w-5/6"></div>