import Link from 'next/link'
import SignUpForm from '@/components/SignUpForm'

const SignUpPage = () => {
	return (
		<div className="flex flex-col p-10">
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
