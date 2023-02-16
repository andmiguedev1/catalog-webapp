export function convertUnits(unit: string, value: string | number) {
   if (unit === 'px' && typeof(value) === 'string') {
      return Math.round(parseFloat(value) * 16);
   }
   if (unit === 'rem' && typeof(value) === 'number') {
      return `${value / 16}rem`
   }
}

type FontSizes = {
   sm: number,
   md: number,
   lg: number
}

export function resposiveFonts({ sm, md, lg }: FontSizes) {
   return {
      '@media (min-width: 600px)': {
         fontSize: convertUnits('rem', sm)
      },
      '@media (min-width:900px)': {
         fontSize: convertUnits('rem', md)
      },
      '@media (min-width: 1200px)': {
         fontSize: convertUnits('rem', lg)
      }
   }   
}