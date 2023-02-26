import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from './app/store/appStore'
import ThemeProvider from './app/theme'
import Router from './app/routes'

import 'react-toastify/dist/ReactToastify.css'

export default function App() {
	return (
		<ReduxProvider store={store}>
			<ThemeProvider>
				<ToastContainer />
				<Router />
			</ThemeProvider>
		</ReduxProvider>
	)
}
