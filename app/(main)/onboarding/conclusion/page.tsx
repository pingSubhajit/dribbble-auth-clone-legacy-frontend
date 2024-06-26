import ConclusionOnboardingForm from '@/components/ConclusionOnboardingForm'
import handleRedirects from '@/lib/redirects'
import {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'What brings you to Dribbble?',
	description: 'Select the options that best describes you. Don\'t worry, you can explore other options later.',
}

const ConclusionOnboardingPage = async () => {
	await handleRedirects('/onboarding/conclusion')

	return (
		<div className="xl-[70%] 2xl:w-[65%] mx-auto">
			<h1 className="font-extrabold text-4xl mx-auto text-center">What brings you to Dribbble?</h1>
			<p className="mt-6 mb-20 opacity-80 mx-auto text-center">Select the options that best describes you. Don't worry, you can explore other options later.</p>

			<ConclusionOnboardingForm />
		</div>
	)
}

export default ConclusionOnboardingPage
