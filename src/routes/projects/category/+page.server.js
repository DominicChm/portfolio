import { base } from "$app/paths"
export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}${base}/api/posts.json`)
	let posts = await res.json()

	let uniqueCategories = {}

	posts.forEach(post => {
		if(!post.categories) return;
		
		post.categories.forEach(category => {
			if (uniqueCategories.hasOwnProperty(category)) {
				uniqueCategories[category].count += 1
			} else {
				uniqueCategories[category] = {
					title: category,
					count: 1
				}
			}
		})
	})

	const sortedUniqueCategories =
		Object.values(uniqueCategories)
			.sort((a, b) => a.title > b.title)

	return {
		uniqueCategories: sortedUniqueCategories
	}
}
