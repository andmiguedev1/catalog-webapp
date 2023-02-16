import { alpha } from '@mui/material/styles'

import themePalette from '../palette'

const themeColor = themePalette('light')
const lightMode = themeColor.grey[500]
const darkMode = themeColor.common.black

function createShadow(color: string) {
   const transparentColor = alpha(color, 0.16)

   return {
      z1: `0 1px 2px 0 ${transparentColor}`,
      z4: `0 4px 8px 0 ${transparentColor}`,
      z8: `0 8px 16px 0 ${transparentColor}`,
      z12: `0 12px 24px -4px ${transparentColor}`,
      z16: `0 16px 32px -4px ${transparentColor}`,
      z20: `0 20px 40px -4px ${transparentColor}`,
      z24: `0 24px 48px 0 ${transparentColor}`,
      primary: `0 8px 16px 0 ${alpha(themeColor.primary.main, 0.24)}`,
      info: `0 8px 16px 0 ${alpha(themeColor.info.main, 0.24)}`,
      secondary: `0 8px 16px 0 ${alpha(themeColor.secondary.main, 0.24)}`,
      success: `0 8px 16px 0 ${alpha(themeColor.success.main, 0.24)}`,
      warning: `0 8px 16px 0 ${alpha(themeColor.warning.main, 0.24)}`,
      error: `0 8px 16px 0 ${alpha(themeColor.error.main, 0.24)}`,
      card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
      dialog: `-40px 40px 80px -8px ${alpha(color, 0.24)}`,
      dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
   }
}

function themeShadows(themeMode: 'light' | 'dark') {
   return themeMode === 'light' ? createShadow(lightMode) : createShadow(darkMode)
}

export default themeShadows