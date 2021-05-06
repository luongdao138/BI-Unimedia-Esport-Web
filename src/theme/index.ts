import { createMuiTheme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { breakpointValues } from '@theme/variables'

const font =
  "'Roboto','Noto Sans Jp', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro',Osaka, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif"

export const userBreakpoints = breakpointValues

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: Colors.primary,
      // light: Colors.grey[600],
      dark: Colors.grey[900],
      // contrastText: '#fff',
    },
    secondary: {
      main: Colors.secondary,
    },
    background: {
      default: Colors.grey[950],
      paper: '#212121',
    },
    error: {
      main: '#F7F735',
    },
    text: {
      primary: 'rgba(255,255,255,0.7)',
      secondary: 'rgba(255,255,255,0.3)',
    },
  },
  breakpoints: {
    values: breakpointValues,
  },
  typography: {
    fontFamily: font,
    h2: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.white,
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
    },
    caption: {
      fontSize: 12,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        padding: '7px 16px',
      },
      containedSizeLarge: {
        padding: '12px 22px',
      },
      outlinedSizeLarge: {
        padding: '12px 22px',
      },
      outlined: {
        padding: '6px 15px',
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '1em',
      },
    },
    MuiSnackbar: {
      root: {
        left: 0,
      },
    },
    MuiCardContent: {
      root: {
        padding: '8px 12px 12px 12px',
        '&:last-child': {
          paddingBottom: '12px',
        },
      },
    },
    MuiCardMedia: {
      root: {
        padding: '12px 12px 8px 12px',
      },
    },
  },
})
