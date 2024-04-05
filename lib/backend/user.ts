'use server'

import {Account, Purpose, User} from '@/lib/backend/backend'
import {getCookie} from 'cookies-next'
import {cookies} from 'next/headers'
import {UNAUTHORIZED_ERROR} from '@/lib/backend/errors'

export const getCurrentUser = async (): Promise<{ data: User }> => {
	const token = getCookie('token', { cookies })

	if (!token) throw new UNAUTHORIZED_ERROR
	
	const requestUrl = `${process.env.BACKEND}/user/me`
	const res = await fetch(requestUrl, {headers: {'Authorization': `Bearer ${token}`}})
	

	if (!res.ok) {
		if (res.status === 401) throw new Error('Unauthorized. Please log in again')
		
		const response = await res.json()
		throw new Error(response)
	}

	return await res.json() as Promise<{ data: User }>
}

type OnboardUserParams = {
	image?: string,
	location?: string,
	purpose?: Purpose[]
}

export const onboardUser = async ( params: OnboardUserParams ): Promise<{ success: boolean, data: Account }> => {
	const token = getCookie('token', { cookies })

	if (!token) throw new UNAUTHORIZED_ERROR

	const {image, location, purpose} = params
	const requestUrl = `${process.env.BACKEND}/user/onboard`
	const requestBody = {} as OnboardUserParams

	if (image) {
		requestBody['image'] = image
	}
	if (location) {
		requestBody['location'] = location
	}
	if (purpose) {
		requestBody['purpose'] = purpose
	}

	const res = await fetch(requestUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(requestBody)
	})

	if (!res.ok) {
		if (res.status === 401) throw new Error('Unauthorized. Please log in again')
		const response = await res.json()
		throw new Error(response)
	}

	return await res.json() as Promise<{ success: boolean, data: Account }>
}
