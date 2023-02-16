import { Theme } from '@mui/material/styles'
import { CustomShadowOptions } from '../shadows/customShadowsType'

declare module '@mui/material/styles' {
	interface Theme {
		customShadows: CustomShadowOptions
	}
	interface ThemeOptions {
		customShadows?: CustomShadowOptions
	}
}

function Card(theme: Theme) {
	return {
		MuiCard: {
			styleOverrides: {
				root: {
					position: 'relative',
					boxShadow: theme.customShadows.card,
					borderRadius: Number(theme.shape.borderRadius) * 2,
					zIndex: 0,
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: {
					variant: 'h6',
				},
				subheaderTypographyProps: {
					variant: 'smallContent',
					marginTop: theme.spacing(0.5),
				},
			},
			styleOverrides: {
				root: {
					padding: theme.spacing(3, 3, 0),
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: theme.spacing(3),
				},
			},
		},
	}
}

export default Card
