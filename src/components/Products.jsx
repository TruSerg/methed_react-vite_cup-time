import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useProducts } from '../context/ProductContext';

import Product from './Product';
import SkeletonLoader from './SkeletonLoader';

const Products = () => {
	const [searchParams] = useSearchParams();
	const { products, setCategory, categories } = useProducts();

	const category = searchParams.get('category');

	const categoryTitle = categories[category] || 'Товары';

	useEffect(() => {
		setCategory(category);
	}, [category, setCategory]);
	return (
		<section className='products'>
			<div className='container'>
				<h2 className='products__title'>{categoryTitle}</h2>

				<ul className='products__list'>
					{products.length ? (
						products.map(({ id, title, img, price, additional }) => (
							<Product
								key={id}
								id={id}
								title={title}
								img={img}
								price={price}
								additional={additional}
							/>
						))
					) : (
						<SkeletonLoader />
					)}
				</ul>
			</div>
		</section>
	);
};

export default Products;
