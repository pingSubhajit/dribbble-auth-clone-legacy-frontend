import Image from 'next/image'
import handleRedirects from '@/lib/redirects'
import {Metadata} from 'next'
import LogoMark from '@/icons/LogoMark'

export const metadata: Metadata = {
	title: 'Welcome to Dribbble',
	description: 'Get started with Dribbble'
}

export default async function Home() {
	await handleRedirects('/')

	return (
		<main className="flex min-h-[60vh] flex-col items-center justify-center p-8 px-0 xl:p-24">
			<div>
				<LogoMark className="w-24 mx-auto" />
				<h1 className="text-4xl font-bold text-center">
					Welcome to Aeonaxy Assignment
				</h1>
				<p className="mt-4 max-w-[600px] text-center">
					Thank you so much for considering my application to join Aeonaxy Technologies as an intern. I am very excited about the opportunity to work with your team and learn from the best in the industry. I am confident that my skills and experience make me a perfect candidate for the position.
				</p>
			</div>
		</main>
	)
}
