import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearch } from '@/store/productSlice';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { CiShoppingBasket } from 'react-icons/ci';
import Modal from './Modal';
import Cart from './Cart';
import Link from 'next/link';

export default function Header() {
	const dispatch = useAppDispatch();
	const search = useAppSelector((s) => s.products.filters.search);
	const [dark, setDark] = useState(false);
	const [openCart, setOpenCart] = useState(false);
	const cartCount = useAppSelector((s) =>
		s.cart.items.reduce((sum, it) => sum + it.quantity, 0)
	);

	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
		setTimeout(() => inputRef.current?.focus(), 150);
	};

	useEffect(() => {
		const saved = localStorage.getItem('dark');
		if (saved === '1') {
			document.documentElement.classList.add('dark');
			setDark(true);
		}
	}, []);

	function toggleDark() {
		const next = !dark;
		setDark(next);
		if (next) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('dark', '1');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.removeItem('dark');
		}
	}

	return (
		<header className="bg-[#b91c1c]">
			<div className="max-w-[1200px] mx-auto text-white flex items-center justify-between py-4">
				<Link href={'/'} className="font-semibold fw-600 text-[39px] leading-[120%] tracking-[0%]">
					CityFresh
				</Link>
				<div className="flex items-center gap-4">
					<div
						className={`flex items-center bg-white/20 rounded-[12px] transition-all duration-300 overflow-hidden ${
							isOpen
								? 'w-64 pl-3 bg-white/20'
								: 'w-12 h-12 justify-center'
						}`}
					>
						<Search
							className="text-white w-6 h-6 cursor-pointer"
							size={20}
							onClick={handleToggle}
						/>

						{isOpen && (
							<input
								ref={inputRef}
								type="text"
								placeholder="Search..."
								value={search}
								onChange={(e) =>
									dispatch(setSearch(e.target.value))
								}
								className="ml-2 py-4 w-full bg-white/20 outline-none text-white"
								onBlur={() => setIsOpen(false)}
							/>
						)}
					</div>
					<button
						onClick={toggleDark}
						className="w-12 h-12 font-6 bg-white/20 rounded-[12px]"
					>
						{dark ? '🌙' : '☀️'}
					</button>
					<Link href={'/product-list'}  className="bg-white/20 text-white px-4 py-3 rounded-[12px] cursor-pointer">
						Product List
					</Link>
					<button
						className="px-3 py-3 bg-white text-[#212121] rounded-[12px] flex items-center gap-1"
						onClick={() => setOpenCart(true)}
					>
						<CiShoppingBasket className="w-6 h-6" /> Item:{' '}
						{cartCount}
					</button>
					{openCart && (
						<Modal onClose={() => setOpenCart(false)}>
							<Cart onClose={() => setOpenCart(false)} />
						</Modal>
					)}
				</div>
			</div>
		</header>
	);
}
