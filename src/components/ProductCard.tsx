import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Product } from '@/types/product';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { addToCart, removeFromCart, setQuantity } from '@/store/cartSlice';
import { deleteProduct } from '@/store/productSlice';
import toast from 'react-hot-toast';
import { Plus, Minus } from 'lucide-react';
import Modal from './Modal';
import ProductForm from './ProductForm';
import { CiShoppingBasket } from "react-icons/ci";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const dispatch = useAppDispatch();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const item = useAppSelector((state: RootState) =>
		state.cart.items.find((i) => i.id === product.id)
	);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShow(false);
			}
		}
		if (show) document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [show]);

	const handleDecrease = () => {
		if (!item) return;
		if (item.quantity > 1) {
			dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }));
		} else {
			dispatch(removeFromCart(item.id));
			toast.error('Removed from cart');
		}
	};

	const handleIncrease = () => {
		if (item) {
			dispatch(setQuantity({ id: item.id, quantity: item.quantity + 1 }));
		} else {
			dispatch(addToCart(product));
			toast.success('Added to cart');
		}
	};

	return (
		<div className="relative rounded-xl p-3 bg-white flex flex-col hover:shadow-lg transition">
			<div
				className="w-7 h-7 rounded-full bg-gray-100 absolute top-1 right-1 flex items-center justify-center cursor-pointer"
				onClick={() => setShow((prev) => !prev)}
			>
				<BsThreeDotsVertical />
			</div>

			{show && (
				<div
					ref={dropdownRef}
					className="w-32 bg-white shadow-lg rounded-md p-2 absolute top-10 right-2 flex flex-col gap-2 z-50"
				>
					<button
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
						onClick={() => setOpen(true)}
					>
						Edit
					</button>
					<button
						className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
						onClick={() => {
							if (confirm('Delete this product?')) {
								dispatch(deleteProduct(product.id));
								toast.success('Product deleted');
							}
						}}
					>
						Delete
					</button>
				</div>
			)}

			<img
				src={product.image}
				alt={product.title}
				className="h-40 object-contain mb-2"
			/>
			<h3 className="font-semibold line-clamp-2 text-[#212121]">{product.title}</h3>
			<p className="font-bold text-[#B71C1C] mt-auto">${product.price}</p>
			<p className="text-sm text-gray-500">{product.category}</p>

			<div className="flex items-center justify-between mt-3 gap-2">
				<div className="flex items-center bg-white border border-gray-300 rounded-lg select-none">
					<button
						onClick={handleDecrease}
						className="px-3 py-[11px] bg-gray-100 text-[#6B7280] hover:bg-gray-100 transition rounded-l-lg cursor-pointer"
					>
						<Minus size={18} />
					</button>

					<span className="px-4 py-2 text-[#212121] font-semibold">
						{item?.quantity || 0}
					</span>

					<button
						onClick={handleIncrease}
						disabled={(item?.quantity ?? 0) > 0}
						className="px-3 py-[11px] bg-gray-100 text-[#6B7280] hover:bg-gray-100 transition rounded-r-lg cursor-pointer"
					>
						<Plus size={18} />
					</button>
				</div>

				<div className="flex gap-2 w-[42.5px] h-[42.5px] bg-[#B71C1C] text-white rounded-[12px] justify-center items-center cursor-pointer hover:bg-red-700 transition text-[24px]">
					<CiShoppingBasket />
				</div>
			</div>

			{open && (
				<Modal onClose={() => setOpen(false)}>
					<ProductForm
						initialProduct={product}
						onClose={() => setOpen(false)}
					/>
				</Modal>
			)}
		</div>
	);
}
