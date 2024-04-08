'use client'

import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import backend, {Purpose} from '@/lib/backend/backend'
import {toast} from 'sonner'
import {DialogContent} from '@/components/ui/dialog'
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Checkbox} from '@/components/ui/checkbox'
import {CheckedState} from '@radix-ui/react-checkbox'
import {Button} from '@/components/ui/button'
import {LoaderCircle} from 'lucide-react'
import {revalidatePath} from "next/cache";

const formSchema = z.object({
	email: z.string().email({message: 'Please enter a valid email address'})
})

const ChangeEmailForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: ''
		}
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const changedEmail = await backend.auth.changeEmail(values.email)
			toast.success('Email changed successfully')
		} catch (error) { // @ts-ignore
			toast.error('Failed to change email', error.message)
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-[550px]">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="john@acme.com" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<Button size="lg" className="bg-dribbblePink rounded-lg" type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
							Change email
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default ChangeEmailForm
