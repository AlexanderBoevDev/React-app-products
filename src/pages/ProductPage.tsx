import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Product {
	id: number;
	name: string;
	options?: {
		size: string;
		amount: number;
	};
	active: boolean;
	createdAt: string;
}

const ProductPage = () => {
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
	
	if (!product) return <p>Loading...</p>;
	
	return (
		<div className="container mx-auto px-4 sm:px-8 py-4">
			<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
				<div className="md:flex">
					<div className="p-8">
						<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.active ? 'Active' : 'Inactive'}</div>
						<h1 className="block mt-1 text-lg leading-tight font-medium text-black">{product.name}</h1>
						<p className="mt-2 text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</p>
						{product.options && (
							<div className="mt-4">
								<h4 className="font-semibold">Options:</h4>
								<p>Size: {product.options.size}</p>
								<p>Amount: {product.options.amount}</p>
							</div>
						)}
						<div className="flex space-x-4 mt-4">
							<button
								onClick={() => navigate('/')}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								To return
							</button>
							<button
								onClick={() => navigate(`/edit-product/${product.id}`)}
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
								Edit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
