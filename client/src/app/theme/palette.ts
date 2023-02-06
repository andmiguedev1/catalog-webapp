import { alpha } from '@mui/material/styles'

import { GreyPalette } from './colors'
import { CommonStyles } from './styles'

export default function palette(themeMode: 'light' | 'dark') {
   const light = {
      ...CommonStyles,
      mode: 'light',
      text: {
      primary: GreyPalette[800],
      secondary: GreyPalette[600],
      disabled: GreyPalette[500],
    },
      background: {
         paper: '#FFFFFF',
         default: '#FFFFFF',
         neutral: GreyPalette[200]
      },
    action: {
      ...CommonStyles.action,
      active: GreyPalette[600],
    },
   } as const

   const dark = {
    ...CommonStyles,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GreyPalette[500],
      disabled: GreyPalette[600],
    },
    background: {
      paper: GreyPalette[800],
      default: GreyPalette[900],
      neutral: alpha(GreyPalette[500], 0.16),
    },
    action: {
      ...CommonStyles.action,
      active: GreyPalette[500],
    },
   } as const
   
   return themeMode === 'light' ? light : dark
}