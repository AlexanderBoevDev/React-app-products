import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
	children: ReactNode;  // Добавление типа для дочерних элементов
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow p-4">
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
