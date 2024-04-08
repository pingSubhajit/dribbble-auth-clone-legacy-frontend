import {NextApiRequest, NextApiResponse} from 'next'
import backend from '@/lib/backend/backend'
import {redirect} from 'next/navigation'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	await backend.auth.logout()
	redirect('/auth/sign-up')
}
