'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, deleteProduct, Product } from '@/store/productSlice';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import ProductForm from '@/components/ProductForm';

export default function ProductListPage() {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const { products, loading, error } = useAppSelector((state) => state.products);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [goToPage, setGoToPage] = useState('');

	useEffect(() => {
		if (products.length === 0) dispatch(fetchProducts());
	}, [dispatch, products.length]);

	const totalPages = Math.ceil(products.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
		setSelectedProduct(null);
	};

	const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setItemsPerPage(Number(e.target.value));
		setCurrentPage(1);
	};

	const handleGoToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const pageNum = Number(goToPage);
			if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
				setCurrentPage(pageNum);
				setGoToPage('');
			}
		}
	};

	return (
		<div className="bg-[#FAFAFA]">
			<div className="py-6 h-auto md:min-h-[734px] max-w-[1200px] mx-auto px-4 lg:px-0 pb-20">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-bold text-[#212121]">Product List</h1>
					<Link
						href={'/add-product'}
						className="bg-[#B71C1C] hover:bg-red-700 text-white rounded-md px-4 py-2"
					>
						Add Product
					</Link>
				</div>

				{loading && <p className="text-gray-600 text-center mt-10">Loading products...</p>}
				{error && <p className="text-red-500 text-center mt-10">Error: {error}</p>}

				{!loading && !error && (
					<div className="overflow-x-auto bg-white rounded shadow-sm border border-gray-200">
						<table className="w-full text-sm text-left text-gray-700">
							<thead className="bg-[#F0F0F0] text-[#212121] text-sm">
								<tr>
									<th className="px-4 py-3 font-medium">Sl. No.</th>
									<th className="px-4 py-3 font-medium">Image</th>
									<th className="px-4 py-3 font-medium">Title</th>
									<th className="px-4 py-3 font-medium">Price</th>
									<th className="px-4 py-3 font-medium">Category</th>
									<th className="px-4 py-3 font-medium text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{currentProducts.map((product, index) => (
									<tr
										key={product.id}
										className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
									>
										<td className="px-4 py-3 font-semibold text-[#212121]">
											{(indexOfFirstItem + index + 1).toString().padStart(2, '0')}
										</td>
										<td className="px-4 py-3">
											<div className="w-10 h-10 overflow-hidden bg-gray-100">
												<img
													src={product.image}
													alt={product.title}
													width={40}
													height={40}
													className="object-contain"
												/>
											</div>
										</td>
										<td className="px-4 py-3 font-semibold text-[#212121] truncate max-w-[200px]">
											{product.title}
										</td>
										<td className="px-4 py-3 font-semibold text-[#212121]">
											${product.price}
										</td>
										<td className="px-4 py-3 capitalize font-semibold text-[#212121]">
											{product.category}
										</td>
										<td className="px-4 py-3 text-center">
											<div className="flex items-center justify-center gap-3">
												<button
													className="text-blue-600 hover:text-blue-700"
													title="Edit"
													onClick={() => handleEdit(product)}
												>
													<Edit className="w-4 h-4" />
												</button>
												<button
													onClick={() => dispatch(deleteProduct(product.id))}
													className="text-red-500 hover:text-red-600"
													title="Delete"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{!loading && !error && products.length > 0 && (
					<div className="flex flex-wrap items-center justify-center md:justify-between mt-4 gap-2 text-sm text-gray-600">
						<div className="flex items-center gap-2">
							<select
								value={itemsPerPage}
								onChange={handleItemsPerPageChange}
								className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
							>
								<option value={10}>10 / page</option>
								<option value={20}>20 / page</option>
								<option value={50}>50 / page</option>
							</select>
							<span>Go to</span>
							<input
								type="number"
								value={goToPage}
								onChange={(e) => setGoToPage(e.target.value)}
								onKeyDown={handleGoToPage}
								className="border border-gray-300 rounded-md w-12 p-1 text-center text-sm focus:outline-none"
							/>
						</div>

						<div className="flex items-center gap-1">
							<button
								onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
								className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
								disabled={currentPage === 1}
							>
								&lt;
							</button>

							{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
								<button
									key={n}
									onClick={() => setCurrentPage(n)}
									className={`px-3 py-1 border rounded-md transition-colors ${
										n === currentPage
											? 'bg-[#B71C1C] border-[#B71C1C] text-white'
											: 'border-gray-300 text-gray-600 hover:bg-gray-100'
									}`}
								>
									{n}
								</button>
							))}

							<button
								onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
								className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
								disabled={currentPage === totalPages}
							>
								&gt;
							</button>
						</div>
					</div>
				)}
			</div>

			{open && selectedProduct && (
				<Modal onClose={handleCloseModal}>
					<ProductForm initialProduct={selectedProduct} onClose={handleCloseModal} />
				</Modal>
			)}
		</div>
	);
}
