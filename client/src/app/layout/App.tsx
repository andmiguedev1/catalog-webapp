import { Route, Switch } from 'react-router-dom'

import CatalogList from '../pages/catalog/CatalogList'
import CatalogDetails from '../pages/catalog/CatalogDetails'
import TestButtons from '../common/buttons/TestButtons'

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/errors/test-errors' component={TestButtons} />
				<Route exact path='/products' component={CatalogList} />
				<Route exact path='/products/:productId' component={CatalogDetails} />
			</Switch>
		</>
	)
}

export default App
