'use server'

import backend from '@/lib/backend/backend'
import {UNAUTHORIZED_ERROR} from '@/lib/backend/errors'
import {redirect} from 'next/navigation'

const handleRedirects = async (currentRoute: string) => {
	let user
	try {
		const {data: userFromDb} = await backend.user.getCurrentUser()
		user = userFromDb
	} catch (error) {
		if (currentRoute !== '/auth/sign-up' && error instanceof UNAUTHORIZED_ERROR && error.code === 401) {
			await redirect('/auth/sign-up')
		}
	}

	if (currentRoute !== '/onboarding/initial' && !user!.account.isOnboarded && !user!.account.image && !user!.account.location) {
		redirect('/onboarding/initial')
	} else if (currentRoute !== '/onboarding/conclusion' && user!.account.image && user!.account.location && user!.account.purpose.length === 0) {
		redirect('/onboarding/conclusion')
	}
	else if (currentRoute !== '/verify' && user!.account.isOnboarded && !user!.account.isVerified) {
		redirect('/verify')
	}
	else if (
		(currentRoute === '/auth/sign-up' || currentRoute === '/onboarding/initial' || currentRoute === '/onboarding/conclusion' || currentRoute === '/verify')
		&& user!.account.isOnboarded && user!.account.isVerified
	) {
		redirect('/')
	}
}

export default handleRedirects
