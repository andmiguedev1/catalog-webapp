import { alpha } from '@mui/material/styles'

import { ErrorPalette, GreyPalette, InfoPalette, PrimaryPalette, SecondaryPalette, SuccessPalette, WarningPalette } from '../palette/colors'

export const CommonStyles = {
   common: { black: '#000000', white: '#FFFFFF' },
   primary: PrimaryPalette,
   secondary: SecondaryPalette,
   info: InfoPalette,
   success: SuccessPalette,
   warning: WarningPalette,
   error: ErrorPalette,
   grey: GreyPalette,
   divider: alpha(GreyPalette[500], 0.24),
   action: {
      hover: alpha(GreyPalette[500], 0.08),
      selected: alpha(GreyPalette[500], 0.16),
      disabled: alpha(GreyPalette[500], 0.8),
      disabledBackground: alpha(GreyPalette[500], 0.24),
      focus: alpha(GreyPalette[500], 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
   }
}