/**
 * All of these values are used throughout the site – for example, 
 * in the <meta> tags, in the footer, and in the RSS feed.
 * 
 * PLEASE BE SURE TO UPDATE THEM ALL! Thank you!
 **/
import { base } from "$app/paths"

export const siteTitle = 'Dominic C.'
export const siteDescription = 'My Portfolio'
export const siteURL = 'https://dominicchm.github.io/portfolio/'
export const siteLink = 'https://dominicchm.github.io/portfolio/'
export const siteAuthor = 'Dominic C.'

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Projects',
		route: `${base}/projects`
	},
	{
		title: 'About',
		route: `${base}/about`
	},
	// {
	// 	title: 'Contact',
	// 	route: '/contact'
	// },
]