import Link from 'next/link'
import SignUpForm from '@/components/SignUpForm'
import {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Sign up to Dribbble',
	description: 'Sign up to Dribbble to get your own profile, follow other designers, and showcase your work.'
}

const SignUpPage = async () => {
	return (
		<div className="flex flex-col p-5 lg:p-10">
			<p className="text-right mb-16">
				<span className="mr-2 text-dribbbleBlack">Already a member?</span>
				<Link href="/auth/sign-in" className="font-semibold text-dribbbleBlue">Sign in</Link>
			</p>

			<div className="mx-auto">
				<h1 className="font-extrabold text-4xl">Sign up to Dribbble</h1>

				<SignUpForm />
			</div>
		</div>
	)
}

export default SignUpPage
