import { postsPerPage } from '$lib/config'

const fetchPosts = async ({ category = '' } = {}) => {

	const posts = await Promise.all(
		Object.entries(import.meta.glob('/src/lib/posts/*.md')).map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			const slug = path.split('/').pop().slice(0, -3)
			return { ...metadata, slug }
		})
	)

	let sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))
	
	if (category) {
    sortedPosts = sortedPosts.filter(post => post.categories.includes(category))
	}
  

	// sortedPosts = sortedPosts.map(post => ({
	// 	title: post.title,
	// 	slug: post.slug,
	// 	excerpt: post.excerpt,
	// 	cover: post.cover,
	// 	coverWidth: post.coverWidth, 
	// 	coverHeight: post.coverHeight,
	// 	date: post.date,
	// 	categories: post.categories,
	// }))

	return {
		posts: sortedPosts
	}
}

export default fetchPosts