'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProduct } from '@/store/productSlice';
import { useRouter } from 'next/navigation';

interface NewProduct {
	title: string;
	category: string;
	price: string;
	details: string;
	image: File | null;
}

export default function AddProductPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	// Get existing products to generate unique ID
	const products = useAppSelector((state) => state.products.products);

	const [product, setProduct] = useState<NewProduct>({
		title: '',
		category: '',
		price: '',
		details: '',
		image: null,
	});

	const [preview, setPreview] = useState<string | null>(null);

	// Handle form field changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setProduct((prev) => ({ ...prev, [name]: value }));
	};

	// Handle image selection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setProduct((prev) => ({ ...prev, image: file }));

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result as string);
			reader.readAsDataURL(file);
		} else {
			setPreview(null);
		}
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate required fields
		if (
			!product.title ||
			!product.category ||
			!product.price ||
			!product.image
		) {
			alert('Please fill all required fields!');
			return;
		}

		// Generate unique ID based on existing products
		const newId =
			products.length > 0
				? Math.max(...products.map((p) => p.id)) + 1
				: 1;

		const newProduct = {
			id: newId,
			title: product.title,
			category: product.category,
			price: parseFloat(product.price),
			description: product.details,
			image: preview, // replace with uploaded URL if needed
		};

		// Add product to Redux store
		dispatch(addProduct(newProduct));

		// Navigate back to product list
		router.push('/product-list');
	};

	return (
		<div className="min-h-screen bg-[#FAFAFA] p-4">
			<div className="max-w-[1200px] mx-auto mt-6 bg-white p-4 rounded-lg">
				<h2 className="text-lg font-bold mb-10">Add Product</h2>
				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					{/* Left side: form fields */}
					<div className="flex flex-col gap-4">
						<label className="text-[16px] font-normal leading-0 text-[#212121]">
							Title*
						</label>
						<input
							type="text"
							name="title"
							value={product.title}
							onChange={handleChange}
							className="border border-[#DCDCDC] rounded-md p-2 mb-2 focus:outline-none"
						/>
						<label className="text-[16px] font-normal leading-0 text-[#212121]">
							Category*
						</label>
						<select
							name="category"
							value={product.category}
							onChange={handleChange}
							className="border border-[#DCDCDC] rounded-md p-[11px] mb-2 focus:outline-none"
						>
							<option value="">Select category</option>
							<option value="electronics">men's clothing</option>
							<option value="fashion">women's clothing</option>
							<option value="books">jewelery</option>
							<option value="home">electronics</option>
						</select>
						<label className="text-[16px] font-normal leading-0 text-[#212121]">
							Price*
						</label>
						<input
							type="number"
							name="price"
							value={product.price}
							onChange={handleChange}
							className="border border-[#DCDCDC] rounded-md p-2 mb-2 focus:outline-none"
						/>

						<label className="text-[16px] font-normal leading-0 text-[#212121]">
							Details
						</label>
						<input
							type="text"
							name="details"
							value={product.details}
							onChange={handleChange}
							className="border border-[#DCDCDC] rounded-md p-2 mb-2 focus:outline-none"
						/>
					</div>

					{/* Right side: image upload */}
					<div className="">
						<p className="text-[16px] font-normal leading-0 text-[#212121] mb-4">
							Image
						</p>
						<div className="flex flex-col h-[213px] items-center justify-center border border-dashed border-[#B71C1C] rounded-md p-4">
							{preview ? (
								<img
									src={preview}
									alt="Preview"
									className="max-h-40 object-contain mb-2"
								/>
							) : (
								<div className="flex flex-col items-center justify-center text-gray-400">
									{/* <p>Choose or drag & drop an image</p> */}
								</div>
							)}
							<input
								type="file"
								accept="image/*"
								placeholder="Browse File"
								onChange={handleFileChange}
								className="text-xl text-[#212121] cursor-pointer text-center"
							/>
						</div>
					</div>

					{/* Buttons */}
					<div className="md:col-span-2 flex justify-center gap-4 mt-4">
						<button
							type="button"
							onClick={() => router.back()}
							className="px-4 py-2 border border-[#ED1400] text-[#ED1400] rounded-lg cursor-pointer"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-[#B71C1C] text-white rounded-lg hover:bg-red-700 cursor-pointer"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
