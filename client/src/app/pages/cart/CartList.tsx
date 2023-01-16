import { useEffect } from 'react'
import { Container } from '@mui/material'

import agent from '../../api/agent'
import { useCartContext } from '../../state/context/cartContext'

import Layout from '../../layout/Layout'
import ShoppingCart from '../../components/cart/ShoppingCart'
import { useCatalogContext } from '../../state/context/catalogContext'
import LoadingIndicator from '../../common/loading/LoadingIndicator'

function CartList() {
	const { loadCatalog, setLoadCatalog } = useCatalogContext()
	const { shoppingCart: shoppingList, setShoppingCart } = useCartContext()

	useEffect(() => {
		agent.CartRoutes.getShoppingCart()
			.then(shoppingCart => setShoppingCart(shoppingCart))
			.catch(error => console.warn(error))
			.finally(() => setLoadCatalog(!loadCatalog))
	}, [setShoppingCart])

	return (
		<Layout>
			<Container>
				{loadCatalog ? (
					<LoadingIndicator message='Loading Cart...' />
				) : (
					<ShoppingCart shoppingList={shoppingList} />
				)}
			</Container>
		</Layout>
	)
}

export default CartList
