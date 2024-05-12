import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Product {
	id: number;
	name: string;
	options?: {
		size?: string;
		amount?: number;
	};
	active: boolean;
	createdAt: string;
}

const EditProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product | null>(null);
	
	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`http://localhost:3001/products/${id}`);
			const data = await response.json();
			setProduct(data);
		};
		
		fetchProduct();
	}, [id]);
	
	const handleInputChange = (field: string, value: any) => {
		setProduct((prev) => {
			if (!prev) return null;
			
			if (field.startsWith('options.')) {
				const optionField = field.split('.')[1];
				return {
					...prev,
					options: {
						...prev.options,
						[optionField]: value,
					},
				};
			} else {
				return {
					...prev,
					[field]: value,
				};
			}
		});
	};
	
	const handleSave = async () => {
		if (product) {
			await fetch(`http://localhost:3001/products/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			});
			navigate(`/product/${id}`);
		}
	};
	
	if (!product) return <p>Loading...</p>;
	
	return (
		<div className="container mx-auto px-4 py-4">
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-2xl font-semibold mb-4">Edit Product ({product.name})</h2>
				<label className="block text-sm font-medium text-gray-700">Name</label>
				<input
					type="text"
					value={product.name}
					onChange={(e) => handleInputChange('name', e.target.value)}
					className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
				
				<div className="mt-4">
					<label className="block text-sm font-medium text-gray-700">Size</label>
					<input
						type="text"
						value={product.options?.size}
						onChange={(e) => handleInputChange('options.size', e.target.value)}
						className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				
				<div className="mt-4">
					<label className="block text-sm font-medium text-gray-700">Amount</label>
					<input
						type="number"
						value={product.options?.amount}
						onChange={(e) => handleInputChange('options.amount', e.target.value)}
						className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				
				<div className="mt-4">
					<label className="block text-sm font-medium text-gray-700">Active</label>
					<select
						value={product.active ? 'true' : 'false'}
						onChange={(e) => handleInputChange('active', e.target.value === 'true')}
						className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
					>
						<option value="true">Active</option>
						<option value="false">Inactive</option>
					</select>
				</div>
				
				<button
					onClick={handleSave}
					className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default EditProductPage;
