import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React from 'react'
import { Colors } from '@theme/colors'
import SpPagination from '@containers/StreamingSettingContainer/IndividualGiftList/SpPagination'

interface Props {
  currentPage: number
  totalPage: number
  onChangePage: (page: number) => void
}

const GiftListPagination: React.FC<Props> = ({ currentPage, totalPage, onChangePage }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const onChangePageEvent = (_event: React.ChangeEvent<unknown>, value: number): void => {
    onChangePage(value)
  }

  if (isMobile) {
    return <SpPagination currentPage={currentPage} totalPage={totalPage} onChangePage={onChangePage} />
  }

  return (
    <Pagination
      defaultPage={1}
      page={currentPage}
      count={totalPage}
      variant="outlined"
      shape="rounded"
      siblingCount={1}
      boundaryCount={1}
      className={classes.paginationStyle}
      onChange={onChangePageEvent}
    />
  )
}

const useStyles = makeStyles(() => ({
  paginationStyle: {
    '& .MuiPaginationItem-root': {
      color: Colors.white,
      borderColor: Colors.primary,
      borderWidth: 1,
      maxWidth: '32px',
      maxHeight: '32px',
      width: 'calc((100vw - 48px) / 15)',
      height: 'calc((100vw - 48px) / 15)',
      minWidth: 'unset',
      minHeight: 'unset',
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
    },
    '& .MuiPaginationItem-ranges': {},
  },
}))

export default GiftListPagination
