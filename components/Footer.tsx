import LogoMark from '@/icons/LogoMark'

const footerLinks = [
	{
		title: 'For designers',
		links: [
			{ name: 'Go Pro!', href: '/go-pro' },
			{ name: 'Explore design work', href: '/explore-design-work' },
			{ name: 'Design blog', href: '/design-blog' },
			{ name: 'Overtime podcast', href: '/overtime-podcast' },
			{ name: 'Playoffs', href: '/playoffs' },
			{ name: 'Weekly Warm-Up', href: '/weekly-warm-up' },
			{ name: 'Refer a friend', href: '/refer' },
			{ name: 'Code of conduct', href: '/conduct' },
		],
	},
	{
		title: 'Hire designers',
		links: [
			{ name: 'Post a job opening', href: '/job/post' },
			{ name: 'Post a freelance project', href: '/job/freelance' },
			{ name: 'Search for designers', href: '/search/designer' },
		],
	},
	{
		title: 'Company',
		links: [
			{ name: 'About', href: '/about' },
			{ name: 'Careers', href: '/careers' },
			{ name: 'Support', href: '/support' },
			{ name: 'Media kit', href: '/about/media-kit' },
			{ name: 'Testimonials', href: '/about/testimonials' },
			{ name: 'API', href: '/developers/api' },
			{ name: 'Terms of service', href: '/legal/terms-of-service' },
			{ name: 'Privacy policy', href: '/legal/privacy-policy' },
			{ name: 'Cookie policy', href: '/legal/cookie-policy' },
		],
	},
	{
		title: 'Directories',
		links: [
			{ name: 'Design jobs', href: '/jobs/design' },
			{ name: 'Designers for hire', href: '/hire/designers' },
			{ name: 'Freelance designers for hire', href: '/hire/designers/freelance' },
			{ name: 'Tags', href: '/tags' },
			{ name: 'Places', href: '/places' },
		],
	},
	{
		title: 'Design resources',
		links: [
			{ name: 'Freelancing', href: '/resources/freelance' },
			{ name: 'Design hiring', href: '/resources/hiring' },
			{ name: 'Design portfolio', href: '/resources/freelance' },
			{ name: 'Design education', href: '/resources/education' },
			{ name: 'Creative process', href: '/resources/creative-process' },
			{ name: 'Design trends', href: '/resources/trends' },
		],
	}
]

const Footer = () => {
	return (
		<footer className="pt-8">
			<div className="flex gap-16">
				<div className="w-96">
					<LogoMark className="w-32"/>
					<p className="mt-2 text-sm">Dribbble is the world's leading community for creatives to share, grow and get hired.</p>
				</div>
				<div className="w-full grid grid-cols-5 gap-8">
					{footerLinks.map((section, index) => (
						<div key={index}>
							<h2 className="font-bold mb-4">{section.title}</h2>
							<ul className="space-y-2 text-zinc-500">
								{section.links.map((link, index) => (
									<li key={index}>
										<a href={link.href}>{link.name}</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<p className="pt-12 pb-4 text-center">
				© 2021 Dribbble. All rights reserved.
			</p>
		</footer>
	)
}

export default Footer
