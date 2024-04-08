'use client'

import Camera from '@/icons/Camera'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'next/navigation'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {useState} from 'react'
import backend from '@/lib/backend/backend'
import {toast} from 'sonner'
import {LoaderCircle} from 'lucide-react'
import Image from 'next/image'

const formSchema = z.object({
	image: z.any({required_error: 'Please choose an image'}),
	location: z.string({required_error: 'Location is required'}).min(2, {
		message: 'Location must be at least 2 characters.',
	})
})

const InitialOnboardingForm = () => {
	const [currentImage, setCurrentImage] = useState<string>('')
	const [file, setFile] = useState<File | null>(null)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			image: null,
			location: '',
		},
	})

	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const upload = await uploadImage(file!)
			const account = await backend.user.onboardUser({
				image: upload.secure_url,
				location: values.location,
			})
			toast.success('Details added successfully')
			router.push('/onboarding/conclusion')
		} catch (error) { // @ts-ignore
			toast.error(error.message ?? 'Failed to add details')
		}
	}

	const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		const imageSrc = URL.createObjectURL(file)
		setCurrentImage(imageSrc)
		setFile(file)
	}

	const uploadImage = async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'n9vh6fip')
		formData.append('cloud_name', 'duecjdycq')

		const response = await fetch('https://api.cloudinary.com/v1_1/duecjdycq/image/upload', {
			method: 'POST',
			body: formData,
		})

		if (!response.ok) {
			const res = await response.json()
			throw new Error(`Failed to upload image. ${res.error.message}`)
		}

		const data = await response.json()
		return data
	}

	return (
		<Form {...form}>
			{/* Form */}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h3 className="text-xl font-extrabold">Add an avatar</h3>
				<div className="mt-8 flex flex-col lg:flex-row gap-5 xl:gap-10">
					{/* Avatar */}
					<div
						className="relative overflow-hidden h-44 w-44 rounded-full border-2 border-dashed border-zinc-300 flex justify-center items-center">
						<Camera/>
						{currentImage && <Image src={currentImage} className="z-10 absolute inset-0 object-cover" fill  alt="profile" />}
					</div>

					<div>
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="text-xl font-extrabold">
										<Button asChild variant="outline" type='button' className="rounded-lg text-base font-semibold p-6 cursor-pointer">
											<span>Choose image</span>
										</Button>
									</FormLabel>
									<FormControl>
										<Input type="file" accept="image/*" {...field} className="hidden" onChange={onImageChange} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<p className="font-semibold text-zinc-400 mt-4"> {'>'} Or choose one of our defaults </p>
					</div>
				</div>


				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className="w-full mt-20">
							<FormLabel className="text-xl font-extrabold">Add your location</FormLabel>
							<FormControl>
								<Input placeholder="Enter a location" className="mt-8 bg-transparent border-b-2 border-zinc-300" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					size="lg"
					className="mt-20 bg-dribbblePink rounded-lg w-64"
					type="submit"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
					Next
				</Button>
			</form>
		</Form>
	)
}

export default InitialOnboardingForm
