import {cn} from '@/lib/utils'

const Camera = ({className}: {className?: string}) => {
	return (
		<svg width="34" height="26" viewBox="0 0 34 26" fill="#9D9EA6" xmlns="http://www.w3.org/2000/svg" className={cn('', className)}>
			<path fillRule="evenodd" clipRule="evenodd"
			      d="M8.5 4L12.5 0H20.5L24.5 4H32C33.1046 4 34 4.89545 34 6V24C34 25.1046 33.1046 26 32 26H2C0.895447 26 0 25.1046 0 24V6C0 4.89545 0.895447 4 2 4H8.5ZM25 14.5C25 19.1944 21.1944 23 16.5 23C11.8056 23 8 19.1944 8 14.5C8 9.8056 11.8056 6 16.5 6C21.1944 6 25 9.8056 25 14.5Z"/>
			<path fillRule="evenodd" clipRule="evenodd"
			      d="M17.75 9H15.25V12.75L11.5 12.75L11.5 15.25H15.25V19H17.75V15.25H21.5V12.75L17.75 12.75V9Z" />
		</svg>

	)
}

export default Camera
