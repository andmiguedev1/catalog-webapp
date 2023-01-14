import { Route, Routes, Navigate } from 'react-router-dom'

import CatalogList from '../pages/catalog/CatalogList'
import CatalogDetails from '../pages/catalog/CatalogDetails'
import CartList from '../pages/cart/CartList'

import ServerError from '../pages/admin/server/ServerError'
import TestButtons from '../common/buttons/TestButtons'
// import AlertErrors from '../common/errors/AlertErrors'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navigate to='/products' replace />} />
				<Route path='products' element={<CatalogList />}>
					<Route path=':productId' element={<CatalogDetails />} />
				</Route>
				<Route path='/cart' element={<CartList />} />
				<Route path='/server/server-error' element={<ServerError />} />
				<Route path='/errors/test-errors' element={<TestButtons />} />
			</Routes>
		</>
	)
}

export default App
