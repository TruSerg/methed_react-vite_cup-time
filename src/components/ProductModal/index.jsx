import { useState } from 'react';
import Modal from 'react-modal';

import { useCart } from '../../context/CartContext';

import { API_URL } from '../../const';

Modal.setAppElement('#root');

import s from './styles.module.css';

const ProductModal = ({
	isOpen,
	onRequestClose,
	id,
	title,
	img,
	price,
	additional,
}) => {
	const [quantity, setQuantity] = useState(1);
	const { addToCart } = useCart();

	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleIncrease = () => {
		setQuantity(quantity + 1);
	};

	const handleAddToCart = () => {
		addToCart({ id, title, img, price, additional }, quantity);

		onRequestClose();
	};

	return (
		<Modal
			className={s.modal}
			overlayClassName={s.overlay}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel={title}
		>
			<img className={s.image} src={`${API_URL}${img}`} alt={title} />

			<div className={s.content}>
				<div className={s.header}>
					<h2 className={s.title}>
						{title}({id})
					</h2>

					<p className={s.price}>{price}&nbsp;₽</p>
				</div>

				<ul className={s.list}>
					{Object.entries(additional).map(([key, value]) => (
						<li key={key} className={s.item}>
							<span className={s.field}>{key}:</span>
							<span className={s.value}>{value}</span>
						</li>
					))}
				</ul>

				<div className={s.footer}>
					<div className={s.count}>
						<button className={s.btn} onClick={handleDecrease}>
							<svg
								width='36'
								height='36'
								viewBox='0 0 36 36'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<rect
									x='0.5'
									y='0.5'
									width='35'
									height='35'
									rx='3.5'
									stroke='#B8B8B8'
								/>
								<rect x='12' y='17' width='12' height='2' fill='#1D1C1D' />
							</svg>
						</button>
						<input
							className={s.number}
							type='number'
							value={quantity}
							readOnly
						/>
						<button className={s.btn} onClick={handleIncrease}>
							<svg
								width='36'
								height='36'
								viewBox='0 0 36 36'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<rect
									x='0.5'
									y='0.5'
									width='35'
									height='35'
									rx='3.5'
									stroke='#B8B8B8'
								/>
								<rect x='12' y='17.25' width='12' height='1.5' fill='#1D1C1D' />
								<rect
									x='17.25'
									y='24'
									width='12'
									height='1.5'
									transform='rotate(-90 17.25 24)'
									fill='#1D1C1D'
								/>
							</svg>
						</button>
					</div>

					<button className={s.btnAddCart} onClick={handleAddToCart}>
						Добавить
					</button>
				</div>
			</div>

			<button className={s.btnCloseCard} onClick={onRequestClose}>
				<svg
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<rect
						x='5.71228'
						y='14.1975'
						width='12'
						height='1.5'
						transform='rotate(-45 5.71228 14.1975)'
						fill='#B8B8B8'
					/>
					<rect
						x='14.1976'
						y='15.2582'
						width='12'
						height='1.5'
						transform='rotate(-135 14.1976 15.2582)'
						fill='#B8B8B8'
					/>
				</svg>
			</button>
		</Modal>
	);
};

export default ProductModal;
