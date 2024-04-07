import ConclusionOnboardingForm from '@/components/ConclusionOnboardingForm'
import handleRedirects from '@/lib/redirects'

const ConclusionOnboardingPage = async () => {
	await handleRedirects('/onboarding/conclusion')

	return (
		<div>
			<h1 className="font-extrabold text-4xl mx-auto text-center">What brings you to Dribbble?</h1>
			<p className="mt-6 mb-20 opacity-80 mx-auto text-center">Select the options that best describes you. Don't worry, you can explore other options later.</p>

			<ConclusionOnboardingForm />
		</div>
	)
}

export default ConclusionOnboardingPage
