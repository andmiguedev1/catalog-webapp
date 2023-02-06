import { useState } from 'react'

export type ThemingOptions = {
   light: 'light',
   dark: 'dark'
}

export const useChangeTheme = () => {
   const [themeMode, setThemeMode] = useState(false)
   const togglePalette = themeMode ? 'dark' : 'light'

   function toggleTheme() {
      setThemeMode(!themeMode)
   }

   return {
      themeMode, togglePalette, toggleTheme
   }
}