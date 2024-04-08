'use client'

import {Button} from '@/components/ui/button'
import backend from '@/lib/backend/backend'
import {toast} from 'sonner'

const ResendEmailButton = () => {
	const resendEmail = async () => {
		try {
			await backend.user.resendVerificationEmail()
			toast.success('Email sent successfully')
		} catch (error) { // @ts-ignore
			toast.error('Failed to send email', error.message)
		}
	}
	
	return (
		<Button onClick={resendEmail} variant="link" className="p-0 text-lg h-auto text-dribbblePink">&nbsp; resend the
			confirmation email
		</Button>
	)
}

export default ResendEmailButton
