import {ReactNode} from 'react'
import backend from '@/lib/backend/backend'
import {UNAUTHORIZED_ERROR} from '@/lib/backend/errors'
import {redirect} from 'next/navigation'

const MainLayout = async ({ children }: { children: ReactNode }) => {
	let user
	try {
		const {data: userFromDb} = await backend.user.getCurrentUser()
		user = userFromDb
	} catch (error) {
		if (error instanceof UNAUTHORIZED_ERROR && error.code === 401) {
			redirect('/auth/sign-up')
		}
	}

	if (!user!.account.isOnboarded) {
		redirect('/onboarding')
	}
	
	return (
		<>
			{children}
		</>
	)
}

export default MainLayout
