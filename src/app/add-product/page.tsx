'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProduct } from '@/store/productSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

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

  const products = useAppSelector((state) => state.products.products);

  const [product, setProduct] = useState<NewProduct>({
    title: '',
    category: '',
    price: '',
    details: '',
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.title || !product.category || !product.price || !product.image) {
      toast.error('Please fill all required fields!');
      return;
    }

    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      title: product.title,
      category: product.category,
      price: parseFloat(product.price),
      description: product.details,
      image: preview || '',
    };

    dispatch(addProduct(newProduct));
    router.push('/product-list');
	toast.success('Product is added successfully!');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4">
      <div className="max-w-[1200px] mx-auto mt-6 bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-10">Add Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-[16px] font-normal leading-0 text-[#212121]">Title*</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="border border-[#DCDCDC] rounded-md p-2 mb-2 focus:outline-none"
            />
            <label className="text-[16px] font-normal leading-0 text-[#212121]">Category*</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border border-[#DCDCDC] rounded-md p-[11px] mb-2 focus:outline-none"
            >
              <option value="">Select category</option>
              <option value="men&apos;s clothing">men&apos;s clothing</option>
              <option value="women&apos;s clothing">women&apos;s clothing</option>
              <option value="jewelery">jewelery</option>
              <option value="electronics">electronics</option>
            </select>
            <label className="text-[16px] font-normal leading-0 text-[#212121]">Price*</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border border-[#DCDCDC] rounded-md p-2 mb-2 focus:outline-none"
            />
            <label className="text-[16px] font-normal leading-0 text-[#212121]">Details</label>
            <input
              type="text"
              name="details"
              value={product.details}
              onChange={handleChange}
              className="border border-[#DCDCDC] rounded-md p-2 mb-2 focus:outline-none"
            />
          </div>

          <div>
            <p className="text-[16px] font-normal leading-0 text-[#212121] mb-4">Image</p>

            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#E57373] rounded-md p-6 h-[213px] bg-[#FCFCFC] relative transition-all hover:bg-[#fff7f7]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFileChange({ target: { files: [file] } });
              }}
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
				  width={200}	
				  height={20}
                  className="h-50 object-contain mb-2 rounded-md"
                />
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#004D40"
                      className="w-8 h-8 mb-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v4h16v-4"
                      />
                    </svg>
                    <p className="text-sm text-[#212121] mb-3">
                      Choose or drag & drop an image
                    </p>
                  </div>
                  <label
                    htmlFor="fileUpload"
                    className="px-3 py-1.5 border border-[#E57373] text-[#B71C1C] rounded-md cursor-pointer text-sm hover:bg-[#FFF5F5] transition"
                  >
                    Browse File
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>

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
