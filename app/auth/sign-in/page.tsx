import Link from 'next/link'
import SignInForm from '@/components/SignInForm'
import {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Sign in to Dribbble',
	description: 'Sign in to Dribbble to access your account and start sharing your work with the world.'
}

const SignInPage = async () => {
	return (
		<div className="flex flex-col p-5 lg:p-10">
			<p className="text-right mb-16">
				<span className="mr-2 text-dribbbleBlack">New to Dribbble?</span>
				<Link href="/auth/sign-up" className="font-semibold text-dribbbleBlue">Sign up</Link>
			</p>

			<div className="mx-auto">
				<h1 className="font-extrabold text-4xl">Sign in to Dribbble</h1>

				<SignInForm />
			</div>
		</div>
	)
}

export default SignInPage
