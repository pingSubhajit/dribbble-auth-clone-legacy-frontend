'use server'

import {User} from '@/lib/backend/backend'
import {getCookie} from 'cookies-next'
import {cookies} from 'next/headers'
import {UNAUTHORIZED_ERROR} from '@/lib/backend/errors'

interface RegisterParams {
	name: string
	username: string
	email: string
	password: string
}

export const checkUsername = async ( username: string ): Promise<{ message: string }> => {
	const requestUrl = `${process.env.BACKEND}/auth/check-username`
	const res = await fetch(requestUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username})
	})

	if (!res.ok) {
		const response = await res.json()
		throw response
	}

	return await res.json() as Promise<{ message: string }>
}

export const register = async ( params?: RegisterParams ): Promise<{ success: boolean, message: string, data: User }> => {
	const {name, username, email, password} = params || {}
	const requestUrl = `${process.env.BACKEND}/auth/register`
	const res = await fetch(requestUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({name, username, email, password})
	})

	if (!res.ok) {
		const response = await res.json()
		throw response
	}

	return await res.json() as Promise<{ success: boolean, message: string, data: User }>
}

type LoginResponse = {
	success: boolean
	message: string
	token: string
}

export const login = async ( email: string, password: string ): Promise<LoginResponse> => {
	const requestUrl = `${process.env.BACKEND}/auth/login`
	const res = await fetch(requestUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email, password})
	})

	if (!res.ok) {
		const response = await res.json()
		throw response
	}

	return await res.json() as Promise<LoginResponse>
}

type ChangeEmailResponse = {
	success: boolean
	message: string,
	data: {
		email: string
	}
}

export const changeEmail = async ( email: string ): Promise<ChangeEmailResponse> => {
	const token = getCookie('token', { cookies })

	if (!token) throw new UNAUTHORIZED_ERROR

	const requestUrl = `${process.env.BACKEND}/auth/change-email`
	const res = await fetch(requestUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({email})
	})

	if (!res.ok) {
		if (res.status === 401) throw new Error('Unauthorized. Please log in again')
		const response = await res.json()
		throw response
	}

	return await res.json() as Promise<ChangeEmailResponse>
}
