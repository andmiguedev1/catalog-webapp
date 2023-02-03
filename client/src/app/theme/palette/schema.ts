export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
   interface TypeBackground {
      neutral: string
   }
   interface SimpleColorOptions {
      lighter: string
      darker: string
   }
   interface PaletteColor {
      lighter: string
      darker: string
   }
}

