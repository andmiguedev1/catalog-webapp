import { Route, Routes, Navigate } from 'react-router-dom'

import { CatalogProvider } from '../state/context/catalogContext'

import CatalogList from '../pages/catalog/CatalogList'
import CatalogDetails from '../pages/catalog/CatalogDetails'
import CartList from '../pages/cart/CartList'
import ServerError from '../pages/admin/server/ServerError'

import TestButtons from '../common/buttons/TestButtons'
// import AlertErrors from '../common/errors/AlertErrors'

function App() {
	return (
		<>
			<CatalogProvider>
				<Routes>
					<Route path='/' element={<Navigate to='/products' replace />} />
					<Route path='products' element={<CatalogList />} />
					<Route path='products/:productId' element={<CatalogDetails />} />
					<Route path='/cart' element={<CartList />} />
					<Route path='/server/server-error' element={<ServerError />} />
					<Route path='/errors/test-errors' element={<TestButtons />} />
				</Routes>
			</CatalogProvider>
		</>
	)
}

export default App
