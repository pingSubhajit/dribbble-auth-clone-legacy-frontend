import InitialOnboardingForm from '@/components/InitialOnboardingForm'
import handleRedirects from '@/lib/redirects'
import {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Create your profile',
	description: 'Let others get to know you better! You can\'t do these later',
}

const InitialOnboardingPage = async () => {
	await handleRedirects('/onboarding/initial')

	return (
		<div className="lg:w-[60%] mx-auto">
			<h1 className="font-extrabold text-4xl">Welcome! Let's create your profile</h1>
			<p className="mt-6 mb-16 opacity-80">Let others get to know you better! You can't do these later</p>

			<InitialOnboardingForm />
		</div>
	)
}

export default InitialOnboardingPage
