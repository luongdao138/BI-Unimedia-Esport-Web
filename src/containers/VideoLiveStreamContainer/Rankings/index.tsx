import { useTranslation } from 'react-i18next'
import {
  makeStyles,
  useTheme,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  useMediaQuery,
} from '@material-ui/core'
import { memo, ReactNode, useMemo } from 'react'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import { videoStyleProps } from '..'

interface Props {
  children: ReactNode
}

const Rankings: React.FC<Props> = ({ children }) => {
  const { isLandscape } = useRotateScreen()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))
  const matchSpSE = useMediaQuery(theme.breakpoints.down(321))
  const iPhonePl = /iPhone/i.test(window.navigator.userAgent)
  const classes = useStyles({ availHeight: 1, availWidth: 1, isLandscape, isIphone: iPhonePl || isMobile })
  const { t } = useTranslation('common')

  const widthColumn = useMemo(() => {
    let defaultWidth = '28%'
    if (isLandscape) {
      defaultWidth = '54px'
    } else {
      if (isMobile) {
        defaultWidth = '60px'
      } else {
        defaultWidth = '28%'
      }
    }
    return defaultWidth
  }, [isLandscape, isMobile, matchSpSE])

  return (
    <Box display={'flex'}>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <colgroup>
            <col style={{ width: isLandscape ? (isMobile ? 46 : 56) : 68 }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: widthColumn }} />
          </colgroup>
          <TableHead className={classes.headerTable}>
            <TableRow>
              <TableCell>{t('arena.listHeaders.place')}</TableCell>
              <TableCell align="left">{t('register_profile.nickname')}</TableCell>
              {/* <TableCell style={{ width: '40%' }} align="center"> */}
              <TableCell align="right">{t('live_stream_screen.tip_mess_tab_title')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.bodyTable}>{children}</TableBody>
          <TableFooter className={classes.footerTable}>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default memo(Rankings)

const useStyles = makeStyles((theme) => ({
  container: {
    borderCollapse: 'inherit',
    overflowX: 'auto',
  },
  table: (props: videoStyleProps) => {
    return {
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      '& .MuiTableCell-root': {
        borderColor: '#707070',
        // backgroundColor: props.isIphone && props.isLandscape ? '#383838' : '#3D3D3D',
        // backgroundColor: '#212121',
      },
      '& .MuiTableCell-stickyHeader': {
        backgroundColor: props.isIphone && props.isLandscape ? '#383838' : props.isIphone && !props.isLandscape ? '#212121' : '#3c3c3c',
      },
    }
  },
  headerTable: {
    borderBottom: 0,
    '& tr': {
      '& td': {
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
      },
      '& th': {
        color: '#fff',
        padding: '16px 16px 6px 16px',
      },
    },
  },
  bodyTable: {
    '& tr': {
      '& td': {
        borderBottom: 'none',
        padding: '10px',
        '&:first-child': {
          paddingLeft: '5px',
        },
      },
    },
  },
  footerTable: {
    '& tr': {
      '& td': {
        paddingTop: 5,
        paddingBottom: 0,
      },
    },
  },
  [theme.breakpoints.down(769)]: {
    bodyTable: {
      '& tr': {
        '& td': {
          '&:nth-child(2)': {
            paddingRight: '0px',
          },
          '&:nth-child(3)': {
            paddingLeft: '3px',
          },
        },
      },
    },
    table: {
      '& .MuiTableCell-stickyHeader': {
        backgroundColor: 'rgb(33 33 33) !important',
      },
    },
    headerTable: {
      '& tr': {
        '& th': {
          padding: 8,
          fontSize: 10,
        },
        '& th:first-child': {
          textAlign: 'center',
        },
      },
    },
    [`@media (orientation: landscape)`]: {
      contentContainer: (props: videoStyleProps) => {
        if (props.isLandscape)
          return {
            bodyTable: {
              '& tr': {
                '& td': {
                  '&:first-child': {
                    padding: '0px',
                  },
                },
              },
            },
          }
      },
    },
  },
}))
