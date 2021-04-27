import { createMuiTheme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { breakpointValues } from '@theme/variables'

const font =
  "'Noto Sans Jp', 'Open Sans', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro',Osaka, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif"

export const userBreakpoints = breakpointValues

export default createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary,
      light: Colors.grey[600],
      dark: Colors.grey[950],
      contrastText: '#fff',
    },
    secondary: {
      main: Colors.secondary,
    },
  },
  breakpoints: {
    values: breakpointValues,
  },
  typography: {
    fontFamily: font,
  },
})
