import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import EditProductPage from '../pages/EditProductPage';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

const Router: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/product/:id" element={<ProductPage/>} />
			<Route path="/edit-product/:id" element={<EditProductPage />} />
			<Route path="/about" element={<About />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Router;
