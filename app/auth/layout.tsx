import {ReactNode} from 'react'
import LogoMark from '@/icons/LogoMark'
import backend from '@/lib/backend/backend'
import {redirect} from 'next/navigation'

const AuthLayout = async ({children}: {children: ReactNode}) => {
	let user
	try {
		const {data: userFromDb} = await backend.user.getCurrentUser()
		user = userFromDb
	} catch (error) {}

	if (user) {
		redirect('/')
	}
	
	return (
		<main className="min-h-screen flex justify-end">
			<div className="h-screen w-[40%] fixed top-0 left-0 p-24">
				<video src="/auth-video.mp4" autoPlay muted loop className="h-full object-cover absolute top-0 left-0 -z-10"></video>

				<LogoMark className="w-32" />

				<h2 className="mt-6 text-4xl leading-tight text-dribbbleBlack font-semibold">
					Discover the world’s top Designers & Creatives.
				</h2>
			</div>

			<div className="w-[60%]">
				{children}
			</div>
		</main>
	)
}

export default AuthLayout
