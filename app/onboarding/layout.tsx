import {ReactNode} from 'react'
import backend from '@/lib/backend/backend'
import {UNAUTHORIZED_ERROR} from '@/lib/backend/errors'
import {redirect} from 'next/navigation'

const OnboardingLayout = async ({ children }: { children: ReactNode }) => {
	try {
		const {data: userFromDb} = await backend.user.getCurrentUser()
	} catch (error) {
		if (error instanceof UNAUTHORIZED_ERROR && error.code === 401) {
			redirect('/auth/sign-up')
		}
	}

	return (
		<>
			{children}
		</>
	)
}

export default OnboardingLayout
