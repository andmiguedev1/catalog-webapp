import { useState, createContext, PropsWithChildren, useContext } from 'react'
import { Cart } from '../../models/cart'

interface CartContextValue {
	shoppingCart: Cart | null
	setShoppingCart: (cart: Cart) => void
	updateCart: boolean
	setUpdateCart: (updateCart: boolean) => void
	removeCartItem: (productId: number, quantity: number) => void
}

export const CartContext =
	createContext<CartContextValue | undefined>(undefined)

export function useCartContext() {
	const context = useContext(CartContext)

	if (context === undefined) {
		throw Error('Error! React cannot access CartProvider.')
	}

	return context
}

export function CartProvider({ children }: PropsWithChildren<any>) {
	const [updateCart, setUpdateCart] = useState(false)
	const [shoppingCart, setShoppingCart] = useState<Cart | null>(null)

	function removeCartItem(productId: number, quantity: number) {
		if (shoppingCart == null) return

		const currentItems = [...shoppingCart.cartItems]

		const findCartItems = currentItems.findIndex(
			currentItem => currentItem.productId === productId,
		)

		if (findCartItems > 0) {
			currentItems[findCartItems].quantity -= quantity

			if (currentItems[findCartItems].quantity === 0) {
				currentItems.splice(findCartItems, 1)

				setShoppingCart(prevState => {
					return { ...prevState!, currentItems }
				})
			}
		}
	}

	return (
		<CartContext.Provider
			value={{
				shoppingCart,
				setShoppingCart,
				updateCart,
				setUpdateCart,
				removeCartItem,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
