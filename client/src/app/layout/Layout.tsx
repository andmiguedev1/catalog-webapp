import { useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'

import {
	createTheme,
	ThemeProvider,
	CssBaseline,
	ThemeOptions,
} from '@mui/material'

import { useManageCart } from '../hooks/useManageCart'
import { useChangeTheme } from '../hooks/useChangeTheme'

import TopBar from '../common/navigation/TopBar/TopBar'
import { getBrowserCookie } from '../utils'

import palette from '../theme/palette'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
	children: JSX.Element
}

function Layout({ children }: Props) {
	const { fetchCustomerCart } = useManageCart()
	const { togglePalette, themeMode, toggleTheme } = useChangeTheme()
	const defaultMode = togglePalette ? 'light' : 'dark'

	const themeOptions: ThemeOptions = useMemo(
		() => ({
			palette: palette(defaultMode),
		}),
		[defaultMode],
	)

	const theme = createTheme(themeOptions)

	useEffect(() => {
		const customerId = getBrowserCookie('clientId')

		if (customerId) {
			fetchCustomerCart()
		}
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<ThemeProvider theme={theme}>
				<ToastContainer />
				<CssBaseline />
				<TopBar themeMode={themeMode} toggleTheme={toggleTheme} />
				{children}
			</ThemeProvider>
		</>
	)
}

export default Layout
