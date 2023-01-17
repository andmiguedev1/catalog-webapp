import { useEffect } from 'react'
import { Container, Grid } from '@mui/material'

import agent from '../../api/agent'
import { useCartContext } from '../../state/context/cartContext'

import Layout from '../../layout/Layout'
import ShoppingCart from '../../components/cart/ShoppingCart'
import SummaryCart from '../../components/cart/SummaryCart'

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
				<Grid container>
					<Grid item xs={6} md={8} />
					<Grid item xs={6} md={4} sx={{ marginTop: 3 }}>
						<SummaryCart />
					</Grid>
				</Grid>
			</Container>
		</Layout>
	)
}

export default CartList
