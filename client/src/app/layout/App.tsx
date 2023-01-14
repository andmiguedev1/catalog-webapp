import { Route, Routes, Navigate } from 'react-router-dom'

import CatalogList from '../pages/catalog/CatalogList'
import CatalogDetails from '../pages/catalog/CatalogDetails'
import CartList from '../pages/cart/CartList'

import ServerError from '../pages/admin/server/ServerError'
import TestButtons from '../common/buttons/TestButtons'
import { CatalogProvider } from '../state/context/catalogContext'
import { CartProvider } from '../state/context/cartContext'
// import AlertErrors from '../common/errors/AlertErrors'

function App() {
	return (
		<>
			<CatalogProvider>
				<CartProvider>
					<Routes>
						<Route path='/' element={<Navigate to='/products' replace />} />
						<Route path='products' element={<CatalogList />}>
							<Route path=':productId' element={<CatalogDetails />} />
						</Route>
						<Route path='/cart' element={<CartList />} />
						<Route path='/server/server-error' element={<ServerError />} />
						<Route path='/errors/test-errors' element={<TestButtons />} />
					</Routes>
				</CartProvider>
			</CatalogProvider>
		</>
	)
}

export default App
