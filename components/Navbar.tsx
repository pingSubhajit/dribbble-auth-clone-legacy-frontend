import backend from '@/lib/backend/backend'
import LogoMark from '@/icons/LogoMark'
import {Button} from '@/components/ui/button'
import {Search} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import Link from 'next/link'
import {cn} from "@/lib/utils";

const SearchBox = ({className}: {className?: string}) => {
	return (
		<Button variant="secondary" className={cn('text-zinc-400 w-36 justify-start gap-2', className)}>
			<Search className="w-5 h-5" />
			<span>Search</span>
		</Button>
	)
}

const Navbar = async () => {
	const {data: user} = await backend.user.getCurrentUser()
	
	return (
		<header className="flex items-center justify-between">
			<div className="flex items-center gap-4 xl:gap-8 ">
				<LogoMark className="w-24 xl:w-28" />
				<nav>
					<ul className="flex gap-4 xl:gap-8 font-medium text-sm">
						<li className="transition-all cursor-pointer hover:text-zinc-500 hidden lg:block">Inspiration</li>
						<li className="transition-all cursor-pointer hover:text-zinc-500 hidden lg:block">Find Work</li>
						<li className="transition-all cursor-pointer hover:text-zinc-500 hidden lg:block">Learn Design</li>
						<li className="transition-all cursor-pointer hover:text-zinc-500 hidden lg:block">Go Pro</li>
						<li className="transition-all cursor-pointer hover:text-zinc-500 hidden lg:block">Hire Designers</li>
						<Link href="/api/auth/logout">
							<li className="transition-all cursor-pointer hover:text-zinc-500">Log out</li>
						</Link>
					</ul>
				</nav>
			</div>

			<div className="flex items-center gap-2 xl:gap-4">
				<SearchBox className="hidden lg:flex" />
				<Avatar>
					<AvatarImage src={user.account.image} />
					<AvatarFallback>{user.name[0]}</AvatarFallback>
				</Avatar>
			</div>
		</header>
	)
}

export default Navbar
