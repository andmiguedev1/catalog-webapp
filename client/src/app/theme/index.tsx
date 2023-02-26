import { useMemo } from 'react'

import { CssBaseline } from '@mui/material'
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider as MaterialThemeProvider,
} from '@mui/material/styles'

import { useThemingContext } from '../store/context/themeContext'

import themePalette from './palette'
import typography from './typography'

import GlobalStyles from './shared/GlobalStyles'
import themeShadows from './shadows/customShadows'

import ThemeComponents from './elements'
import modifyShadows from './shadows/modifiedShadows'

interface Props {
	children: React.ReactNode
}

function ThemeProvider({ children }: Props) {
	const { themeMode } = useThemingContext()

	const themeOptions: any = useMemo(
		() => ({
			palette: themePalette(themeMode),
			typography,
			shadows: modifyShadows(themeMode),
			customShadows: themeShadows(themeMode),
		}),
		[themeMode],
	)

	const theme = createTheme(themeOptions)
	theme.components = ThemeComponents(theme)

	return (
		<StyledEngineProvider injectFirst>
			<MaterialThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles />
				{children}
			</MaterialThemeProvider>
		</StyledEngineProvider>
	)
}

export default ThemeProvider
