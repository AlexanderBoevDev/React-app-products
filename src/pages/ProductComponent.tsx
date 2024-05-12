import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productSlice';

const ProductComponent = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(state => state.products.items);
	const productStatus = useAppSelector(state => state.products.status);
	
	useEffect(() => {
		if (productStatus === 'idle') {
			dispatch(fetchProducts());
		}
	}, [productStatus, dispatch]);
	
	return (
		<div>
			<h1>Products</h1>
			{productStatus === 'loading' ? (
				<p>Loading...</p>
			) : (
				<ul>
					{products.map(product => (
						<li key={product.id}>{product.name}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ProductComponent;