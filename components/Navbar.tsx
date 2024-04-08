import backend from '@/lib/backend/backend'
import LogoMark from '@/icons/LogoMark'
import {Button} from '@/components/ui/button'
import {Search} from 'lucide-react'
import {Avatar, AvatarImage} from '@/components/ui/avatar'
import Link from 'next/link'

const SearchBox = () => {
	return (
		<Button variant="secondary" className="text-zinc-400 w-36 justify-start gap-2">
			<Search className="w-5 h-5" />
			<span>Search</span>
		</Button>
	)
}

const Navbar = async () => {
	const {data: user} = await backend.user.getCurrentUser()
	
	return (
		<header className="flex items-center justify-between">
			<div className="flex items-center gap-8 ">
				<LogoMark className="w-28" />
				<nav>
					<ul className="flex gap-8 font-medium text-sm">
						<li className="transition-all cursor-pointer hover:text-zinc-500">Inspiration</li>
						<li className="transition-all cursor-pointer hover:text-zinc-500">Find Work</li>
						<li className="transition-all cursor-pointer hover:text-zinc-500">Learn Design</li>
						<li className="transition-all cursor-pointer hover:text-zinc-500">Go Pro</li>
						<li className="transition-all cursor-pointer hover:text-zinc-500">Hire Designers</li>
						<Link href="/api/auth/logout">
							<li className="transition-all cursor-pointer hover:text-zinc-500">Log out</li>
						</Link>
					</ul>
				</nav>
			</div>

			<div className="flex items-center gap-4">
				<SearchBox />
				<Avatar>
					<AvatarImage src={user.account.image} />
				</Avatar>
			</div>
		</header>
	)
}

export default Navbar
