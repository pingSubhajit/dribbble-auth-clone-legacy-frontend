'use client'

import {z} from 'zod'
import backend, {Purpose} from '@/lib/backend/backend'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Button, buttonVariants} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import {Check, LoaderCircle} from 'lucide-react'
import {Checkbox} from '@/components/ui/checkbox'
import {motion} from 'framer-motion'

const formSchema = z.object({
	purpose: z.array(z.string(), {required_error: 'Please select at least one purpose'})
})

const items = [
	{
		id: 'SHARE',
		label: 'I\'m a designer looking to share my work',
		description: 'Showcase your work to millions of designers and get feedback on your projects.',
		image: '/share.svg'
	},
	{
		id: 'HIRE',
		label: 'I\'m looking to hire a designer for a project',
		description: 'Find the perfect designer for your project to bring your ideas to life.',
		image: '/hire.svg'
	},
	{
		id: 'INSPIRATION',
		label: 'I\'m looking for design inspiration',
		description: 'With over 7 million designers, Dribbble is the leading source for design inspiration.',
		image: '/inspiration.svg'
	}
] as const

const ConclusionOnboardingForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			purpose: []
		},
	})

	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const account = await backend.user.onboardUser({
				purpose: values.purpose as Purpose[]
			})
			toast.success('Details added successfully')
			router.push('/verify')
		} catch (error) {
			toast.error('Failed to add details')
		}
	}

	return (
		<Form {...form}>
			{/* Form */}
			<form onSubmit={form.handleSubmit(onSubmit)} className="">
				<FormField
					control={form.control}
					name="purpose"
					render={() => (
						<FormItem className="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 space-y-0 gap-8">
							{items.map((item) => (
								<FormField
									key={item.id}
									control={form.control}
									name="purpose"
									render={({ field }) => {
										return (
											<FormItem
												key={item.id}
												className=""
											>
												<FormControl className="peer">
													<Checkbox
														className="sr-only"
														checked={field.value?.includes(item.id)}
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([...field.value, item.id])
																: field.onChange(
																	field.value?.filter(
																		(value) => value !== item.id
																	)
																)
														}}
													/>
												</FormControl>
												<FormLabel className={cn(
													'transition-all items-center rounded-md border-2 border-muted p-8 hover:border-accent ' +
													'h-[350px] block peer-focus-visible:ring-2 ring-black ring-offset-2 rounded-md ' +
													'hover:ring-black hover:ring-2 cursor-pointer relative',
													field.value?.includes(item.id) && 'border-dribbblePink'
												)}>
													<div className={cn(
														field.value?.includes(item.id) && 'absolute inset-x-8 bottom-8'
													)}>
														<motion.div layout>
															<img src={item.image} alt={item.label} className="mb-8 mx-auto"/>
															<p className="block w-full p-2 text-center font-bold text-lg transition-all">{item.label}</p>
														</motion.div>

														<motion.p className={cn(
															'transition-all hidden text-center text-zinc-400',
															field.value?.includes(item.id) && 'block'
														)} initial={{opacity: 0}} animate={field.value?.includes(item.id) ? {opacity: 1} : {opacity: 0}}
														>{item.description}</motion.p>

														<motion.div
															layout
															className={cn('transition-all mt-2 border-2 border-dribbbleBlack w-min p-1 rounded-full opacity-40 mx-auto',
																field.value?.includes(item.id) && 'bg-dribbblePink border-dribbblePink opacity-100'
															)}
														>
															<motion.div initial={{scale: 0}} animate={field.value?.includes(item.id) ? {scale: 1} : {scale: 0}}>
																<Check className="w-4 h-4 stroke-white stroke-[4px]" />
															</motion.div>
														</motion.div>
													</div>
												</FormLabel>
											</FormItem>
										)
									}}
								/>
							))}
						</FormItem>
					)}
				/>
				<div className="mt-20 flex flex-col items-center">
					<p className="font-bold mb-4">Anything else? You can select multiple</p>
					<Button
						size="lg"
						className="bg-dribbblePink rounded-lg w-64"
						type="submit"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting && <LoaderCircle className="w-4 h-4 mr-2 animate-spin"/>}
						Finish
					</Button>
				</div>

			</form>
		</Form>
	)
}

export default ConclusionOnboardingForm
