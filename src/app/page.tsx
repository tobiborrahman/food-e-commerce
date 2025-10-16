'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, setSort } from '@/store/productSlice';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import Banner from '@/components/Banner';

const PAGE_SIZE = 6;

export default function HomePage() {
	const dispatch = useAppDispatch();
	const { products, loading, error, filters } = useAppSelector(
		(state) => state.products
	);

	useEffect(() => {
		if (products.length === 0) dispatch(fetchProducts());
	}, [dispatch, products.length]);

	const filtered = useMemo(() => {
		let list = products.slice();

		if (filters.search.trim()) {
			const q = filters.search.trim().toLowerCase();
			list = list.filter((p) => p.title.toLowerCase().includes(q));
		}

		if (filters.category !== 'all') {
			list = list.filter((p) => p.category === filters.category);
		}

		if (
			typeof filters.minPrice === 'number' &&
			!Number.isNaN(filters.minPrice)
		) {
			list = list.filter((p) => p.price >= (filters.minPrice ?? 0));
		}
		if (
			typeof filters.maxPrice === 'number' &&
			!Number.isNaN(filters.maxPrice)
		) {
			list = list.filter((p) => p.price <= (filters.maxPrice ?? 0));
		}

		if (filters.sort === 'price-asc') {
			list.sort((a, b) => a.price - b.price);
		} else if (filters.sort === 'price-desc') {
			list.sort((a, b) => b.price - a.price);
		}

		return list;
	}, [products, filters]);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const currentPage = Math.min(filters.page, totalPages);
	const paged = filtered.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE
	);

	useEffect(() => {
	}, [filters.sort]);

	return (
		<main>
			<Banner />
			<div className="bg-[#FAFAFA]">
				<div className="flex flex-col lg:flex-row gap-10 max-w-[1200px] mx-auto py-8 lg:py-[67px] px-4 lg:px-0">
					<Filters />
					<section className="flex-1">
						<div className="flex justify-between items-center mb-2">
							<h1 className="text-3xl font-semibold mb-4 leading-[120%] text-[#212121]">
								Products
							</h1>
							<div className="flex flex-row items-center gap-2">
								<label className="block text-sm text-[#6B7280] ">
									Sort By:
								</label>
								<div className="relative inline-block">
									<select
										value={filters.sort}
										onChange={(e) =>
											dispatch(
												setSort(
													e.target.value as
														| 'none'
														| 'price-asc'
														| 'price-desc'
												)
											)
										}
										className="bg-white border border-[#ECEFF1] rounded-md p-2 max-w-[197px] text-sm focus:outline-none"
									>
										<option
											className="text-[#212121] text-sm font-normal leading-[120%] tracking-[0%]"
											value="none"
										>
											None
										</option>
										<option
											className="text-[#212121] text-sm font-normal leading-[120%] tracking-[0%]"
											value="price-asc"
										>
											Low to High
										</option>
										<option
											className="text-[#212121] text-sm font-normal leading-[120%] tracking-[0%]"
											value="price-desc"
										>
											High to Low
										</option>
									</select>
								</div>
							</div>
						</div>
						{loading && <p>Loading...</p>}
						{error && <p className="text-red-500">{error}</p>}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{paged.map((p) => (
								<ProductCard key={p.id} product={p} />
							))}
						</div>
						<div className="mt-6 flex items-center justify-center gap-3">
							<p>
								Page {currentPage} / {totalPages}
							</p>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
