import { createMuiTheme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { breakpointValues } from '@theme/variables'

const font =
  "'Noto Sans Jp', 'Open Sans', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro',Osaka, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif"

export const userBreakpoints = breakpointValues

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: Colors.primary,
      // light: Colors.grey[600],
      // dark: Colors.grey[950],
      // contrastText: '#fff',
    },
    secondary: {
      main: Colors.secondary,
    },
    background: {
      default: Colors.black,
      paper: '#212121',
    },
    error: {
      main: '#F7F735',
    },
  },

  breakpoints: {
    values: breakpointValues,
  },
  typography: {
    fontFamily: font,
    h2: {
      fontSize: 18,
    },
    h3: {
      fontSize: 16,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        borderRadius: 25,
        minHeight: 50,
        boxShadow: '0px 0px 10px #e11ad4',
        fontWeight: 'bold',
        '&:hover': {
          boxShadow: '0px 0px 10px #e11ad4',
          background: Colors.white,
          backgroundColor: Colors.white,
          color: Colors.primary,
        },
        background:
          'transparent linear-gradient(234deg, #D600FD 0%, #FC5E66 100%, #FB5C69 100%, #FD6161 100%) 0% 0% no-repeat padding-box;',
        '&.Mui-disabled': {
          background: '#4D4D4D',
          color: 'rgba(255,255,255,0.3)',
          boxShadow: 'none',
        },
      },
      outlined: {
        borderRadius: 25,
        minHeight: 50,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(255,255,255,0.7)',
        '&:hover': {
          background: 'rgba(255,255,255,0.3)',
          color: Colors.white,
        },
      },
    },
  },
})
