import { StyledEngineProvider } from '@mui/material/styles'

function ThemeProvider() {
	return <StyledEngineProvider injectFirst></StyledEngineProvider>
}

export default ThemeProvider
