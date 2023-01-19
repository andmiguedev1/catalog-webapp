import { useEffect } from 'react'
import { Container, Grid } from '@mui/material'

import { useManageCart } from '../../hooks/useManageCart'

import Layout from '../../layout/Layout'
import ShoppingCart from '../../components/cart/ShoppingCart'
import SummaryCart from '../../components/cart/SummaryCart'

function CartList() {
	const { shoppingCart: shoppingList, fetchCustomerCart } = useManageCart()

	useEffect(() => {
		fetchCustomerCart()
		// eslint-disable-next-line
	}, [])

	return (
		<Layout>
			<Container>
				<ShoppingCart cartList={shoppingList} />
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
