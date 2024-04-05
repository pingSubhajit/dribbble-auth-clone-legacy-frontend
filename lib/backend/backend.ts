import {changeEmail, checkUsername, login, register} from '@/lib/backend/auth'
import {getCurrentUser, onboardUser} from '@/lib/backend/user'

const backend = {
	auth: {
		checkUsername,
		register,
		login,
		changeEmail
	},
	user: {
		getCurrentUser,
		onboardUser
	}
}

export default backend

export enum Purpose {
	SHARE = 'SHARE',
	HIRE = 'HIRE',
	INSPIRATION = 'INSPIRATION'
}

export type Account = {
	id: string
	isOnboarded: boolean
	isVerified: boolean
	image: string
	location: string
	purpose: Purpose[]
}

export type User = {
	id: string
	name: string
	username: string
	email: string
	account: Account
}

