import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
	return (
		<header className="bg-gray-800 text-white p-4">
			<div className="container mx-auto px-4 sm:px-8">
				<nav>
					<ul className="flex space-x-4">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
