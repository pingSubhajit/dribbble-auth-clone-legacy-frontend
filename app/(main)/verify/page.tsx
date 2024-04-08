import handleRedirects from '@/lib/redirects'
import {Params} from 'next/dist/shared/lib/router/utils/route-matcher'
import Mail from '@/icons/Mail'
import backend from '@/lib/backend/backend'
import {Button} from '@/components/ui/button'
import {redirect} from 'next/navigation'
import {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Verify your email address',
	description: 'Verify your email address to start using Dribbble',
}

const VerifyPage = async ({searchParams}: {params: Params, searchParams: Params}) => {
	await handleRedirects('/verify')
	const {data: user} = await backend.user.getCurrentUser()
	const {code} = searchParams
	let verifyError = ''

	if (code) {
		try {
			const verifyResponse = await backend.user.verifyUser(code as string)
		} catch (error) { // @ts-ignore
			verifyError = error.message
		}

		if (!verifyError) {
			redirect('/')
		}
	}

	return (
		<div>
			<div className="lg:w-[65%] 2xl:w-[40%] mt-16 mx-auto text-center flex flex-col items-center">
				{!verifyError && <h1 className="text-4xl font-bold mb-8">Please verify your email...</h1>}
				{verifyError && <h1 className="text-4xl font-bold mb-8">Couldn't verify your email, {verifyError}</h1>}

				<Mail />

				<p className="mt-8 opacity-80 text-lg">
					Please verify your email address. We've sent a confirmation email to:
				</p>
				<p className="mt-4 font-bold text-xl">{user!.email}</p>
				<p className="mt-4 opacity-80 text-lg">
					Click the confirmation link in that email to begin using Dribbble
				</p>

				<p className="mt-4 opacity-80 text-lg">
					Didn't receive the email? Check your spam folder, it may have been caught by a filter. If you still
					don't see it, you can
					<Button variant="link" className="p-0 text-lg h-auto text-dribbblePink">&nbsp; resend the
						confirmation email</Button>
				</p>

				<p className="mt-4 opacity-80 text-lg">
					Wrong email address?
					<Button variant="link" className="p-0 text-lg h-auto text-dribbblePink">&nbsp; Change it.</Button>
				</p>
			</div>
		</div>
	)
}

export default VerifyPage
