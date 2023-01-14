import { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'

import { Cart } from '../../models/cart'

import agent from '../../api/agent'

import LoadingIndicator from '../../common/loading/LoadingIndicator'
import Layout from '../../layout/Layout'
import ShoppingCart from '../../components/cart/ShoppingCart'

function CartList() {
	const [loadShopItems, setLoadShopItems] = useState(true)
	const [shoppingList, setShoppingList] = useState<Cart | null>(null)

	useEffect(() => {
		agent.CartRoutes.getShoppingCart()
			.then(shoppingList => setShoppingList(shoppingList))
			.catch(error => console.warn(error))
			.finally(() => setLoadShopItems(false))
	}, [])

	if (loadShopItems) return <LoadingIndicator message='Loading shopping list' />

	if (!shoppingList)
		return (
			<Typography variant='h3'>There are no items in the shopping cart</Typography>
		)

	return (
		<Layout>
			<Container>
				<ShoppingCart shoppingList={shoppingList} />
			</Container>
		</Layout>
	)
}

export default CartList
