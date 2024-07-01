<script>
	import { siteAuthor } from '$lib/config';
	import {base} from "$app/paths"
</script>

<footer class="bg-base-100 z-50 flex justify-between">
	<a href="{base}/">Home</a>

	<p>&copy;{new Date().getFullYear()} {siteAuthor}</p>
</footer>
