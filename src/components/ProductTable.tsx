import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import EditProductModal from './EditProductModal';
import { useAppDispatch } from '../app/hooks';
import { fetchProducts } from '../features/products/productSlice';
import { Link } from 'react-router-dom';

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

const ProductTable = () => {
	const dispatch = useAppDispatch();
	const products = useSelector((state: RootState) => state.products.items);
	const status = useSelector((state: RootState) => state.products.status);
	
	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);
	
	const [nameFilter, setNameFilter] = useState('');
	const [activeFilter, setActiveFilter] = useState('');
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	
	useEffect(() => {
		applyFilters();
	}, [products, nameFilter, activeFilter]);
	
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
	
	const handleEdit = (product: Product) => {
		setCurrentProduct(product);
		setIsModalOpen(true);
	};
	
	const handleClose = () => {
		setIsModalOpen(false);
	};
	
	const applyFilters = () => {
		const newFilteredProducts = products.filter(product =>
			product.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
			(activeFilter === '' || product.active.toString() === activeFilter)
		);
		setFilteredProducts(newFilteredProducts);
	};
	
	if (status === 'loading') {
		return <p>Loading...</p>;
	}
	
	return (
		<div className="container mx-auto px-4 sm:px-8">
			<div className="py-8">
				<div className="flex justify-between">
					<h2 className="text-2xl font-semibold leading-tight">Products</h2>
					<div className="flex bg-white shadow rounded mb-4">
						<input
							type="text"
							value={nameFilter}
							onChange={(e) => setNameFilter(e.target.value)}
							placeholder="Search by name"
							className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
						/>
						<select
							value={activeFilter}
							onChange={(e) => setActiveFilter(e.target.value)}
							className="p-2 border-t border-b border-gray-200 bg-white">
							<option value="">All</option>
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</div>
				</div>
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
						<tr>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Name
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Status
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Created
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Actions
							</th>
						</tr>
						</thead>
						<tbody>
						{filteredProducts.map((product) => (
							<tr key={product.id}>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div className="flex items-center">
										<div className="ml-3">
											<Link to={`/product/${product.id}`} className="text-indigo-600 hover:text-indigo-900 underline">
												{product.name}
											</Link>
										</div>
									</div>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										{product.active ? 'Active' : 'Inactive'}
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										{new Date(product.createdAt).toLocaleDateString()}
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900">
										Edit
									</button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
			{isModalOpen && currentProduct && (
				<EditProductModal product={currentProduct} onClose={handleClose}/>
			)}
		</div>
	);
};

export default ProductTable;
