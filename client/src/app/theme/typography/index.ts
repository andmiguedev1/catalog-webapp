import { convertUnits, resposiveFonts } from '../functions';

const fontPrimary = 'Public Sans, sans-serif'

const typography = {
  fontFamily: fontPrimary,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: convertUnits('rem', 40),
    ...resposiveFonts({ sm: 52, md: 58, lg: 64})
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: convertUnits('rem', 32),
    ...resposiveFonts({ sm: 40, md: 44, lg: 48 })
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: convertUnits('rem', 24),
    ...resposiveFonts({ sm: 26, md: 30, lg: 32 })
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: convertUnits('rem', 20),
    ...resposiveFonts({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: convertUnits('rem', 18),
    ...resposiveFonts({ sm: 19, md: 20, lg: 20 })
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: convertUnits('rem', 24),
    ...resposiveFonts({ sm: 18, md: 18, lg: 18 })
  },
  mainTitle: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: convertUnits('rem', 16)
  },
  subtitle: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: convertUnits('rem', 14)
  },
  content: {
    lineHeight: 1.5,
    fontSize: convertUnits('rem', 16)
  },
  smallContent: {
    lineHeight: 22 / 14,
    fontSize: convertUnits('rem', 14)
  },
  caption: {
    lineHeight: 1.5,
    fontSize: convertUnits('rem', 12)
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: convertUnits('rem', 12),
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: convertUnits('rem', 14),
    textTransform: 'capitalize'
  }
}

export default typography