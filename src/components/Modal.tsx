import React from 'react';

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="bg-white p-4 rounded w-full max-w-lg relative">
				<button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>✕</button>
				{children}
			</div>
		</div>
	);
}
