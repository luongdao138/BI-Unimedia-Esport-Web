import { createMuiTheme } from '@material-ui/core/styles'
import { Colors } from './colors'

const font =
  "'Noto Sans Jp', 'Open Sans', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro',Osaka, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif"

const breakpointValues = {
  xs: 0,
  sm: 414 /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */,
  md: 720 /* smartphones, Android phones, landscape iPhone */,
  lg: 960 /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */,
  xl: 1200 /* hi-res laptops and desktops */,
}

export const userBreakpoints = {}

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
    error: {
      main: '#FFA8A8',
    },
    background: {
      default: '#212121',
      paper: '#3A3A3C',
    },
    text: {
      primary: '#EFEFF4',
      secondary: '#ADABAB',
    },
    info: {
      main: '#3A3A3C',
    },
    grey: Colors.grey,
  },
  shape: {
    borderRadius: 9,
  },
  breakpoints: {
    values: breakpointValues,
  },
  typography: {
    fontFamily: font,
    h6: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
    caption: {
      fontSize: '0.625rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 3px 4px #000000CC',
      },
      rounded: {
        borderRadius: 9,
      },
    },
    MuiTabs: {
      flexContainer: {
        width: '100%',
        background: '#3A3A3C',
      },
    },
    MuiSwitch: {
      colorPrimary: {
        '&.Mui-checked': {
          color: Colors.white,
        },
        '&.Mui-checked + $track': {
          background: 'transparent linear-gradient(180deg, #D600FD 0%, #FC5E66 97%, #FD6161 100%) 0% 0% no-repeat padding-box;',
          opacity: 1,
        },
      },
      track: {
        // backgroundColor: COLOR.MOUNTAIN_MIST,  //TODO:check
        opacity: 1,
      },
    },
    MuiSelect: {
      select: {
        color: Colors.lightpurple,
      },
      icon: {
        color: Colors.grey[500],
      },
    },
    MuiDrawer: {
      paper: {
        width: '350px',
        backgroundColor: 'transparent',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#DDDDDD',
      },
    },
    MuiDialog: {
      root: {
        borderRadius: 9,
      },
      container: {
        backdropFilter: 'blur(5px)',
      },
      paperWidthSm: {
        overflow: 'visible',
      },
      paperFullScreen: {
        height: 'inherit',
        background: '#2C2C2E',
      },
    },
    MuiDialogTitle: {
      root: {
        fontSize: 24,
      },
    },
    MuiButton: {
      root: {
        borderRadius: '5px',
      },
      sizeLarge: {
        paddingTop: '6px',
        paddingBottom: '6px',
      },
      label: {
        fontWeight: 400,
      },
      contained: {
        backgroundColor: Colors.grey[500],
        color: Colors.white,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: Colors.grey[500],
          opacity: 0.9,
        },
        '&:active': {
          boxShadow: 'none',
        },
        // SNUFF,
      },
      containedSecondary: {
        background: 'transparent linear-gradient(180deg, rgba(80,79,79,1) 0%, rgba(58,58,60,1) 100%) 0% 0% no-repeat padding-box;',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
        color: Colors.primary,
        border: '1px solid ' + Colors.primary,
        height: 48,
        '&.Mui-disabled': {
          color: Colors.white,
          background: Colors.grey[500],
        },
      },
      containedPrimary: {
        color: '#3A3A3C',
        background: 'transparent linear-gradient(180deg, #FFE600 0%, #F2CD5C 100%, #FB5C69 100%, #FD6161 100%) 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
        height: 48,
      },
      outlinedPrimary: {
        background: 'transparent linear-gradient(180deg, #3A3A3C 0%, #504F4F 100%) 0% 0% no-repeat padding-box;',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
        height: 48,
      },
      outlined: {
        border: '1px solid #fff',
      },
    },
    MuiSvgIcon: {
      root: {
        border: 'none',
        borderRadius: '50%',
      },
      fontSizeInherit: {
        width: '28px',
        height: '28px',
      },
      fontSizeSmall: {
        width: '22px',
        height: '22px',
      },
      colorSecondary: {
        color: Colors.grey[500],
      },
    },
    MuiStepIcon: {
      root: {
        color: 'transparent',
        '&$active': {
          color: Colors.white,
        },
        '&$completed': {
          color: Colors.white,
        },
      },
      text: {
        fill: Colors.grey[500],
      },
    },
    MuiStepConnector: {
      line: {
        borderColor: '#707070',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: 16,
      },
    },
    MuiInput: {
      underline: {
        borderBottom: Colors.white,
        '&$focused': {
          '&:not(.Mui-disabled)': {
            '&:before': {
              borderBottom: `2px solid ${Colors.purple}`,
            },
          },
        },
        '&:hover': {
          '&:not(.Mui-disabled)': {
            '&:before': {
              borderBottom: `1px solid ${Colors.purple}`,
            },
          },
        },
        '&:before': {
          borderBottom: `1px solid ${Colors.lightWhite}`,
        },
        '&:after': {
          borderBottom: `1px solid ${Colors.purple}`,
        },
        '&.Mui-error:after': {
          borderBottomColor: Colors.pinkLight,
        },
      },
    },
    MuiMenu: {
      paper: {
        '&.MuiPaper-root': {
          backgroundColor: '#DEDCDC',
          color: '#212121',
          boxShadow: 'none',
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
          borderTopLeftRadius: 14,
          borderTopRightRadius: 0,
        },
      },
    },
    MuiInputLabel: {
      shrink: {
        transform: 'translate(0, 1.5px) scale(1)',
        transformOrigin: 'top left',
      },
    },
    MuiFab: {
      root: {
        backgroundColor: '#212121',
        color: '#FFFFFF',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#564267',
          '@media (hover: none)': {
            backgroundColor: '#564267',
            boxShadow: 'none',
          },
        },
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      root: {
        marginRight: 4,
        marginBottom: 4,
        backgroundColor: '#8F9DBD',
        color: '#fff',
        fontSize: '0.75rem',
      },
      outlined: {
        border: '1px solid #707070',
        color: '#EFEFF4',
      },
      colorPrimary: {
        background: 'transparent linear-gradient(180deg, #B95CA4 0%, #D236A3 100%) 0% 0% no-repeat padding-box;',
      },
      colorSecondary: {
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: '#FFE600',
      },
      sizeSmall: {
        fontSize: '0.625rem',
        height: 22,
        minWidth: 48,
      },
      labelSmall: {
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
    MuiGrid: {},
    MuiCardHeader: {
      root: {
        paddingBottom: 8,
      },
      action: {
        marginTop: 8,
      },
      title: {
        fontSize: '1rem',
        fontWeight: 600,
      },
    },
    MuiCardContent: {
      root: {
        paddingTop: 8,
        paddingBottom: 0,
      },
    },
    MuiCardActions: {
      root: {
        justifyContent: 'flex-end',
        paddingRight: 16,
        paddingLeft: 16,
      },
    },
    MuiBadge: {
      colorPrimary: {
        color: '#FF4786',
        backgroundColor: '#EFEFF4',
        minWidth: 22,
        height: 22,
      },
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: 'rgb(40, 40, 40)',
        color: '#FFFFFF',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#fff',
        '&$focused': {
          color: '#fff',
        },
        '&.Mui-error': {
          color: '#fff',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        '&.Mui-error': {
          marginTop: 7,
          fontSize: 11,
        },
      },
    },
  },
})
