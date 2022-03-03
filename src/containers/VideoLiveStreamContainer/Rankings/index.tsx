import { useTranslation } from 'react-i18next'
import { makeStyles, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core'
import { memo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Rankings: React.FC<Props> = ({ children }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <Box mt={1}>
      <TableContainer className={classes.container}>
        <Table className={classes.table}>
          <TableHead className={classes.headerTable}>
            <TableRow>
              <TableCell style={{ width: '20%' }}>{t('arena.listHeaders.place')}</TableCell>
              <TableCell style={{ width: '40%' }} align="left">
                {t('register_profile.nickname')}
              </TableCell>
              <TableCell style={{ width: '40%' }} align="center">
                {t('live_stream_screen.tip_mess_tab_title')}
              </TableCell>
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

const useStyles = makeStyles(() => ({
  container: {
    borderCollapse: 'inherit',
    overflowX: 'auto',
  },
  table: {
    borderCollapse: 'collapse',
  },
  headerTable: {
    borderBottom: 0,
    '& tr': {
      '& td': {
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
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
}))
