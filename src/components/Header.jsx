import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Header = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const closeMenu = () => {
		setIsOpenMenu(false);
	};

	const openMenu = () => {
		setIsOpenMenu(true);
	};

	const { cart } = useCart();
	const { categories } = useProducts();
	const location = useLocation();

	const getActiveClass = category => {
		const currentCategory = new URLSearchParams(location.search).get(
			'category'
		);

		return currentCategory === category ? 'active' : '';
	};

	return (
		<header className='header'>
			<div className='container header__container'>
				<Link to='/' className='header__logo-link'>
					<img
						src='image/logo.svg'
						alt='Логотип Cup Time'
						className='header__logo'
					/>
				</Link>

				<nav className={`header__nav ${isOpenMenu ? 'active' : ''}`}>
					<ul className='header__menu'>
						{Object.entries(categories).map(([key, value]) => (
							<li key={key} className='header__menu-item'>
								<Link
									to={`/products?category=${key}`}
									className={`header__menu-link ${getActiveClass(key)}`}
									onClick={closeMenu}
								>
									{value}
								</Link>
							</li>
						))}
					</ul>

					<button className='header__close-btn' onClick={closeMenu}>
						<svg
							width='28'
							height='28'
							viewBox='0 0 28 28'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<rect
								x='7.28174'
								y='7.07532'
								width='20'
								height='1'
								transform='rotate(45 7.28174 7.07532)'
								fill='#D9D9D9'
							/>
							<rect
								x='6.5752'
								y='21.2173'
								width='20'
								height='1'
								transform='rotate(-45 6.5752 21.2173)'
								fill='#D9D9D9'
							/>
						</svg>
					</button>
				</nav>

				<div className='header__control'>
					<Link to='/cart' className='header__cart-link'>
						{cart ? cart.reduce((acc, item) => item.quantity + acc, 0) : 0}
					</Link>

					<button
						className='header__burger'
						aria-label='Открыть меню'
						onClick={openMenu}
					>
						<svg
							width='28'
							height='29'
							viewBox='0 0 28 29'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<rect x='4' y='9.5' width='20' height='1' fill='#D9D9D9' />
							<rect x='4' y='14.5' width='20' height='1' fill='#D9D9D9' />
							<rect x='4' y='19.5' width='20' height='1' fill='#D9D9D9' />
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
