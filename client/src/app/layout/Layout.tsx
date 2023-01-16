import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import TopBar from '../common/navigation/TopBar/TopBar'
import { getBrowserCookie } from '../utils'
import agent from '../api/agent'
import { useCartContext } from '../state/context/cartContext'

interface Props {
	children: JSX.Element
}

function Layout({ children }: Props) {
	const { setShoppingCart } = useCartContext()

	const [darkMode, setDarkMode] = useState(false)
	const paletteToggle = darkMode ? 'dark' : 'light'

	const theme = createTheme({
		palette: {
			mode: paletteToggle,
			primary: {
				main: paletteToggle === 'light' ? '#d8d8d8' : '#182747',
			},
			secondary: {
				main: paletteToggle === 'light' ? '#50577a' : '#62728e',
			},
			background: {
				default: paletteToggle === 'light' ? '#f5f5f5' : '#434242',
			},
		},
	})

	function toggleThemeMode() {
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		const customerId = getBrowserCookie('clientId')

		if (customerId) {
			agent.CartRoutes.getShoppingCart()
				.then(customerCart => setShoppingCart(customerCart))
				.catch(error => console.warn(error))
		}
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<ThemeProvider theme={theme}>
				<ToastContainer />
				<CssBaseline />
				<TopBar darkMode={darkMode} toggleThemeMode={toggleThemeMode} />
				{children}
			</ThemeProvider>
		</>
	)
}

export default Layout
