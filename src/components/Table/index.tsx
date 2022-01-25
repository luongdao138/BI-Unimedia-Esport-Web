import { makeStyles, Table, TableBody, TableContainer, TableHead } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { ReactNode } from 'react'
// import { useTranslation } from 'react-i18next'

interface Props {
  tableHeader?: ReactNode
  classTable?: string
}

const ESTable: React.FC<Props> = ({ tableHeader, children, classTable }) => {
  //   const { t } = useTranslation('common')
  const classes = useStyles()
  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={`${classes.table} ${classTable}`}>
        <TableHead className={classes.headerTable}>{tableHeader}</TableHead>
        <TableBody className={classes.bodyTable}>{children}</TableBody>
      </Table>
    </TableContainer>
  )
}
export default ESTable

const useStyles = makeStyles(() => ({
  tableContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity[30],
    borderCollapse: 'inherit',
  },
  table: {
    borderCollapse: 'inherit',
  },
  headerTable: {
    background: Colors.black_card,
    borderBottom: 0,
    padding: 5,
    '& tr': {
      '& th': {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        color: Colors.white,
      },
    },
  },
  bodyTable: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity[30],
    background: '#161616',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    '& tr': {
      '& td': {
        padding: 10,
        fontSize: 12,
        borderBottom: 'none',
      },
    },
  },
}))
