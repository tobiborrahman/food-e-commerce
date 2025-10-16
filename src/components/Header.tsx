'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearch } from '@/store/productSlice';
import { useEffect, useRef, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { CiShoppingBasket } from 'react-icons/ci';
import Modal from './Modal';
import Cart from './Cart';
import Link from 'next/link';

export default function Header() {
	const dispatch = useAppDispatch();
	const search = useAppSelector((s) => s.products.filters.search);
	const [dark, setDark] = useState(false);
	const [openCart, setOpenCart] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const cartCount = useAppSelector((s) =>
		s.cart.items.reduce((sum, it) => sum + it.quantity, 0)
	);

	const handleToggleSearch = () => {
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
		<header className="bg-[#b91c1c] dark:bg-gray-600 text-white relative z-50">
			<div className="max-w-[1200px] mx-auto flex items-center justify-between p-4 lg:px-0">
				<button
					className="sm:hidden flex items-center justify-center w-12 h-12 rounded-lg bg-white/20 transition-all"
					onClick={() => setMenuOpen((prev) => !prev)}
				>
					{menuOpen ? (
						<X
							size={24}
							className="transition-transform duration-300 rotate-90 text-white"
						/>
					) : (
						<Menu
							size={24}
							className="transition-transform duration-300 rotate-0 text-white"
						/>
					)}
				</button>

				<Link
					href={'/'}
					className="font-semibold text-[28px] sm:text-[34px] leading-[120%]"
				>
					CityFresh
				</Link>

				<div className="flex items-center gap-3">
					<div
						className={`flex items-center bg-white/20 rounded-[12px] transition-all duration-300 overflow-hidden ${
							isOpen
								? 'w-48 h-12 sm:w-64 pl-3'
								: 'w-12 h-12 justify-center'
						}`}
					>
						<Search
							className="text-white w-5 h-5 cursor-pointer"
							onClick={handleToggleSearch}
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
								className="ml-2 pl-1 py-2 w-full bg-transparent outline-none text-white text-sm"
								onBlur={() => setIsOpen(false)}
							/>
						)}
					</div>

					<button
						onClick={toggleDark}
						className="hidden sm:flex w-12 h-12 bg-white/20 rounded-[12px] justify-center items-center"
					>
						{dark ? '🌙' : '☀️'}
					</button>

					<Link
						href={'/product-list'}
						className="bg-white/20 hidden md:block text-white px-4 py-3 rounded-[12px] text-center"
						onClick={() => setMenuOpen(false)}
					>
						Product List
					</Link>

					<button
						className="w-12 h-12 bg-white text-[#212121] rounded-[12px] flex md:hidden items-center justify-center relative"
						onClick={() => setOpenCart(true)}
					>
						<CiShoppingBasket className="w-6 h-6" />
						{cartCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-[#b91c1c] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
								{cartCount}
							</span>
						)}
					</button>
					<button
						className="w-12 h-12 md:w-auto md:h-12 hidden md:flex md:px-3 bg-white text-[#212121] rounded-[12px] items-center justify-center relative"
						onClick={() => setOpenCart(true)}
					>
						<CiShoppingBasket className="w-6 h-6 mr-1" /> Item:{' '}
						{cartCount}
					</button>
				</div>
			</div>

			<div
				className={`sm:hidden overflow-hidden bg-[#a11212] flex flex-col gap-3 px-4 transition-all duration-500 ease-in-out ${
					menuOpen
						? 'max-h-[400px] opacity-100 py-4'
						: 'max-h-0 opacity-0 py-0'
				}`}
			>
				<Link
					href={'/product-list'}
					className="bg-white/20 text-white px-4 py-3 rounded-[12px] text-center"
					onClick={() => setMenuOpen(false)}
				>
					Product List
				</Link>

				<button
					onClick={toggleDark}
					className="bg-white/20 text-white px-4 py-3 rounded-[12px]"
				>
					{dark ? '🌙 Light Mode' : '☀️ Dark Mode'}
				</button>

				<button
					onClick={() => setOpenCart(true)}
					className="bg-white/20 text-white px-4 py-3 rounded-[12px] flex items-center justify-center gap-2"
				>
					<CiShoppingBasket className="w-6 h-6" /> Cart ({cartCount})
				</button>
			</div>

			{openCart && (
				<Modal onClose={() => setOpenCart(false)}>
					<Cart onClose={() => setOpenCart(false)} />
				</Modal>
			)}
		</header>
	);
}
