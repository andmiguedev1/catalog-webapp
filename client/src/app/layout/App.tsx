import { Route, Switch } from 'react-router-dom'

import CatalogList from '../pages/catalog/CatalogList'
import CatalogDetails from '../pages/catalog/CatalogDetails'
import Alerts from '../common/errors/Alerts'

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/alert/test-errors' component={Alerts} />
				<Route exact path='/products' component={CatalogList} />
				<Route exact path='/products/:productId' component={CatalogDetails} />
			</Switch>
		</>
	)
}

export default App
