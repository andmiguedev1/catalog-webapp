import { useEffect } from 'react'

import { useManageCart } from '../hooks/useManageCart'
import { getBrowserCookie } from '../utils'

// import TopBar from '../common/navigation/TopBar/TopBar'

import 'react-toastify/dist/ReactToastify.css'
interface Props {
	children: JSX.Element
}

function Layout({ children }: Props) {
	// const { themeMode } = useThemingContext()
	const { fetchCustomerCart } = useManageCart()

	// const toggleTheme = themeMode ? 'light' : 'dark'
	// const [changeMode, setChangeTheme] = useState(false)

	// function setColorTheme() {
	// 	setChangeTheme(!changeMode)
	// }

	useEffect(() => {
		const customerId = getBrowserCookie('clientId')

		if (customerId) {
			fetchCustomerCart()
		}
		// eslint-disable-next-line
	}, [])

	return (
		<>
			{/* <TopBar
				switchMode={changeMode}
				toggleTheme={setColorTheme}
			/> */}
			{children}
		</>
	)
}

export default Layout
