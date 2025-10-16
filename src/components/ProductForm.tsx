import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addProduct, editProduct } from '@/store/productSlice';
import { Product } from '@/types/product';
import toast from 'react-hot-toast';

export default function ProductForm({ initialProduct, onClose }: { initialProduct?: Product; onClose: () => void }) {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState(initialProduct?.title || '');
	const [price, setPrice] = useState(initialProduct?.price || 0);
	const [description, setDescription] = useState(initialProduct?.description || '');
	const [category, setCategory] = useState(initialProduct?.category || 'other');
	const [image, setImage] = useState(initialProduct?.image || '');

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (initialProduct) {
			dispatch(editProduct({ ...initialProduct, title, price, description, category, image }));
				toast.success('Product updated');
		} else {
			const id = Math.floor(Math.random() * 1000000) + Date.now();
			dispatch(addProduct({ id, title, price, description, category, image } as Product));
				toast.success('Product added');
		}
		onClose();
	}

	return (
		<form onSubmit={onSubmit} className="space-y-3">
			<h2 className="text-lg font-semibold">{initialProduct ? 'Edit' : 'Add'} Product</h2>
			<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" />
			<input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" className="w-full border p-2 rounded" />
			<input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full border p-2 rounded" />
			<input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="w-full border p-2 rounded" />
			<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" />
			<div className="flex gap-2 justify-end">
				<button type="button" className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
				<button type="submit" className="px-4 py-2 bg-[#B71C1C] text-white rounded">Save</button>
			</div>
		</form>
	);
}
