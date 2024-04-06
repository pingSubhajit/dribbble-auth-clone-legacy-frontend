import {redirect} from 'next/navigation'
import backend from '@/lib/backend/backend'
import {UNAUTHORIZED_ERROR} from '@/lib/backend/errors'
import InitialOnboardingForm from '@/components/InitialOnboardingForm'

const InitialOnboardingPage = async () => {
	let user
	try {
		const {data: userFromDb} = await backend.user.getCurrentUser()
		user = userFromDb
	} catch (error) {
		if (error instanceof UNAUTHORIZED_ERROR && error.code === 401) {
			redirect('/auth/sign-up')
		}
	}
	
	if (user!.account.image && user!.account.location) {
		redirect('/onboarding/conclusion')
	}

	return (
		<div>
			<h1 className="font-extrabold text-4xl">Welcome! Let's create your profile</h1>
			<p className="mt-6 mb-16 opacity-80">Let others get to know you better! You can't do these later</p>

			<InitialOnboardingForm />
		</div>
	)
}

export default InitialOnboardingPage
