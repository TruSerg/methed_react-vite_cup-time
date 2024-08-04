import { useState } from 'react';

import ProductModal from './ProductModal';

import { API_URL } from '../const';

const Product = ({ id, title, img, price, additional }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = e => {
		e.preventDefault();

		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<li className='products__item'>
			<a
				className='product__link'
				href='#'
				onClick={openModal}
				aria-label={`Открыть модальное окно для ${title}`}
			>
				<article className='product'>
					<img
						className='product__image'
						src={`${API_URL}${img}`}
						alt={title}
					/>
					<div className='product__content'>
						<h3 className='product__title'>{title}</h3>
						<p className='product__price'>{price}&nbsp;₽</p>
					</div>
				</article>
			</a>
			<ProductModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				id={id}
				title={title}
				img={img}
				price={price}
				additional={additional}
			/>
		</li>
	);
};

export default Product;
