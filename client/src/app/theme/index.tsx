import { useMemo } from 'react'
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider as MaterialThemeProvider,
} from '@mui/material/styles'

import themePalette from './palette'
import typography from './typography'

function ThemeProvider() {
	const themeOptions: any = useMemo(
		() => ({
			palette: themePalette,
			typography,
		}),
		[],
	)

	const theme = createTheme(themeOptions)

	return (
		<StyledEngineProvider injectFirst>
			<MaterialThemeProvider theme={theme}></MaterialThemeProvider>
		</StyledEngineProvider>
	)
}

export default ThemeProvider
