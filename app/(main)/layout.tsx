import {ReactNode} from 'react'

const MainLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<>
			{children}
		</>
	)
}

export default MainLayout
