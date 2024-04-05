export class UNAUTHORIZED_ERROR extends Error {
	code = 401
	message = 'Unauthorized. Please log in again'
}