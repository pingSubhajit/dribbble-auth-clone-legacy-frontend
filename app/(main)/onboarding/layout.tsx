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
		<main className="py-12 lg:mt-16">
			<div className="mx-auto">
				{children}
			</div>
		</main>
	)
}

export default OnboardingLayout
