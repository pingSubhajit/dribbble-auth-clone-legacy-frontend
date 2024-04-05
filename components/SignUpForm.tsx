'use client'

import {cn} from '@/lib/utils'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Input} from '@/components/ui/input'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {useState} from 'react'
import backend from '@/lib/backend/backend'
import {Checkbox} from '@/components/ui/checkbox'
import {Button} from '@/components/ui/button'
import {CheckedState} from '@radix-ui/react-checkbox'
import {LoaderCircle} from 'lucide-react'
import {toast} from 'sonner'
import {useRouter} from 'next/navigation'
import {setCookie} from 'cookies-next'

const FormErrors = ({errors, className}: {errors: any, className?: string}) => {
	return (
		<ul className={cn('space-y-3 list-disc list-inside', className)}>
			{Object.keys(errors).map((key) => (
				<li key={key} className="text-dribbbleRed font-medium">{errors[key].message}</li>
			))}
		</ul>
	)
}

const formSchema = z.object({
	name: z.string({required_error: 'Name is required.'}).min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	username: z.string({required_error: 'Username is required'}).min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	email: z.string({required_error: 'Email is required'}).email({
		message: 'Invalid email address.',
	}),
	password: z.string({required_error: 'Password is required'}).min(8, {
		message: 'Password must be at least 8 characters long.',
	})
})

const SignUpForm = () => {
	const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	})
	
	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const user = await backend.auth.register({
				name: values.name,
				username: values.username,
				email: values.email,
				password: values.password,
			})
			
			toast.success(`Account with ${user.data.username} username created successfully.`)
			const response = await backend.auth.login(values.email, values.password)
			toast.success('Logged in successfully')
			setCookie('token', response.token)
			await router.push('/')
		} catch (error: any) {
			if (error?.message) {
				toast.error(error.message)
			} else {
				toast.error('An error occurred. Please try again.')
			}
		}
	}

	const checkUsername = async () => {
		form.clearErrors('username')
		const username = form.getValues('username')
		try {
			const response = await backend.auth.checkUsername(username)
		} catch (error) {
			form.setError('username', {type: 'custom', message: 'Username has already been taken'})
		}
	}

	return (
		<>
			<FormErrors errors={form.formState.errors} className="mt-8 mb-10" />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 max-w-[550px]">
					<div className="flex gap-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Full name" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem onBlur={checkUsername} className="w-full">
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Full name" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="john@acme.com" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="8+ characters" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<div className="flex">
						<Checkbox className="mt-1 mr-2" checked={agreedToTerms} onCheckedChange={setAgreedToTerms as (checked: CheckedState) => void} />
						<p>
							Creating an account means you're okay with our
							<span className="text-dribbbleBlue font-medium">Terms of Service, Privacy Policy,</span> and our default
							<span className="text-dribbbleBlue font-medium"> Notification Settings</span>
						</p>
					</div>

					<Button size="lg" className="bg-dribbblePink rounded-lg" type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
						Create Account
					</Button>
				</form>
			</Form>

			<p className="mt-8 text-xs max-w-96 text-gray-400 font-medium">
				This site is protected by reCAPTCHA and the Google <span className="text-dribbbleBlue font-medium">Privacy Policy</span> and
				<span className="text-dribbbleBlue font-medium"> Terms of Service</span> apply.
			</p>
		</>
	)
}

export default SignUpForm
