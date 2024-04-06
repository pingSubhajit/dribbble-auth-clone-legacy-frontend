import {ReactNode} from 'react'
import backend from '@/lib/backend/backend'
import {UNAUTHORIZED_ERROR} from '@/lib/backend/errors'
import {redirect} from 'next/navigation'
import LogoMark from '@/icons/LogoMark'

const OnboardingLayout = async ({ children }: { children: ReactNode }) => {
	let user
	try {
		const {data: userFromDb} = await backend.user.getCurrentUser()
		user = userFromDb
	} catch (error) {
		if (error instanceof UNAUTHORIZED_ERROR && error.code === 401) {
			redirect('/auth/sign-up')
		}
	}

	if (user!.account.isOnboarded) {
		redirect('/')
	}

	return (
		<main className="px-24 py-12">
			<header>
				<LogoMark fill="#EA4C89" className="w-32"/>
			</header>

			<div className="w-[50%] mt-16 mx-auto">
				{children}
			</div>
		</main>
	)
}

export default OnboardingLayout
