import {ReactNode} from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const MainLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<div className="px-24">
				<Navbar />
				{children}
			</div>

			<div className="bg-[#FAFAFA] px-24">
				<Footer />
			</div>
		</div>
	)
}

export default MainLayout
