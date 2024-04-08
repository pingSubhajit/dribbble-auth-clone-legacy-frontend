import Link from 'next/link'
import SignInForm from '@/components/SignInForm'

const SignInPage = async () => {
	return (
		<div className="flex flex-col p-10">
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
