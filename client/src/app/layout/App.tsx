import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import TestButtons from '../common/buttons/TestButtons'
// import AlertErrors from '../common/errors/AlertErrors'
import CatalogList from '../pages/catalog/CatalogList'
import CatalogDetails from '../pages/catalog/CatalogDetails'
import ServerError from '../pages/admin/server/ServerError'

// Navigation history of browser agent
export const history = createBrowserHistory()

function App() {
	return (
		<>
			<Router history={history}>
				<Switch>
					<Route exact path='/server/server-error' component={ServerError} />
					<Route exact path='/products' component={CatalogList} />
					<Route exact path='/products/:productId' component={CatalogDetails} />
					<Route path='/errors/test-errors' component={TestButtons} />
				</Switch>
			</Router>
		</>
	)
}

export default App
