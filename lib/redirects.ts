'use server'

import backend from '@/lib/backend/backend'
import {UNAUTHORIZED_ERROR} from '@/lib/backend/errors'
import {redirect} from 'next/navigation'

const handleRedirects = async (currentRoute: string) => {
	let user = null
	try {
		const {data: userFromDb} = await backend.user.getCurrentUser()
		user = userFromDb
	} catch (error) {
		if (currentRoute !== '/auth/sign-up' && currentRoute !== '/auth/sign-in' && error instanceof UNAUTHORIZED_ERROR && error.code === 401) {
			return redirect('/auth/sign-up')
		}
	}

	if (currentRoute !== '/auth/sign-up' && currentRoute !== '/auth/sign-in' && !user) {
		return redirect('/auth/sign-up')
	} else if (currentRoute !== '/onboarding/initial' && !user!.account.isOnboarded && !user!.account.image && !user!.account.location) {
		return redirect('/onboarding/initial')
	} else if (currentRoute !== '/onboarding/conclusion' && user!.account.image && user!.account.location && user!.account.purpose.length === 0) {
		return redirect('/onboarding/conclusion')
	} else if (currentRoute !== '/verify' && user!.account.isOnboarded && !user!.account.isVerified) {
		return redirect('/verify')
	} else if (
		(currentRoute === '/auth/sign-up' || currentRoute === '/onboarding/initial' || currentRoute === '/onboarding/conclusion' || currentRoute === '/verify')
		&& user!.account.isOnboarded && user!.account.isVerified
	) {
		return redirect('/')
	}
}

export default handleRedirects
