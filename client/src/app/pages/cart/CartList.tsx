import { useEffect } from 'react'
import { Container } from '@mui/material'

import agent from '../../api/agent'
import { useCartContext } from '../../state/context/cartContext'

import Layout from '../../layout/Layout'
import ShoppingCart from '../../components/cart/ShoppingCart'

function CartList() {
	const { shoppingCart: shoppingList, setShoppingCart } = useCartContext()

	useEffect(() => {
		agent.CartRoutes.getShoppingCart()
			.then(shoppingList => setShoppingCart(shoppingList))
			.catch(error => console.warn(error))
		// eslint-disable-next-line
	}, [setShoppingCart])

	return (
		<Layout>
			<Container>
				<ShoppingCart shoppingList={shoppingList} />
			</Container>
		</Layout>
	)
}

export default CartList
