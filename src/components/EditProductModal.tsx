import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { updateProduct } from '../features/products/productSlice';

interface Product {
	id: number;
	name: string;
	description?: string;
	options?: {
		size: string;
		amount: number;
	};
	active: boolean;
	createdAt: string;
}

interface EditProductModalProps {
	product: Product;
	onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose }) => {
	const [name, setName] = useState(product.name);
	const [description, setDescription] = useState(product.description || ""); // Обработка случая, когда description отсутствует
	const dispatch = useAppDispatch();
	
	const handleSave = () => {
		dispatch(updateProduct({ ...product, name, description }));
		onClose();
	};
	
	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
			<div className="bg-white p-4 rounded-lg font-semibold">
				<h2 className="text-lg mb-3">Edit Product</h2>
				<div>
					<label className="block italic mb-2">Name:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border rounded p-2 w-full"
					/>
				</div>
				<div className="my-3">
					<button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 me-3 rounded">
						Save
					</button>
					<button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 me-3 rounded">
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditProductModal;
