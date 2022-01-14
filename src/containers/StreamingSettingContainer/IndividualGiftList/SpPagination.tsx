import React from 'react'
import { Box, Icon, makeStyles } from '@material-ui/core'
import SpPaginationButton from '@containers/StreamingSettingContainer/IndividualGiftList/SpPaginationButton'

interface Props {
  currentPage: number
  totalPage: number
  onChangePage: (page: number) => void
}

const SpPagination: React.FC<Props> = ({ currentPage, totalPage, onChangePage }) => {
  const classes = useStyles()
  return (
    <Box display="flex" flexDirection="row">
      <SpPaginationButton type="control" disable={currentPage === 1} onClick={() => onChangePage(1)}>
        <Icon className={`fas fa-angle-double-left ${classes.icon}`} fontSize="small" />
      </SpPaginationButton>
      <SpPaginationButton type="control" disable={currentPage === 1} onClick={() => onChangePage(currentPage - 1)}>
        <Icon className={`fa fa-angle-left ${classes.icon}`} fontSize="small" />
      </SpPaginationButton>
      <SpPaginationButton type="page">{currentPage.toString()}</SpPaginationButton>
      <SpPaginationButton type="control" disable={currentPage === totalPage} onClick={() => onChangePage(currentPage + 1)}>
        <Icon className={`fa fa-angle-right ${classes.icon}`} fontSize="small" />
      </SpPaginationButton>
      <SpPaginationButton type="control" disable={currentPage === totalPage} onClick={() => onChangePage(totalPage)}>
        <Icon className={`fas fa-angle-double-right ${classes.icon}`} fontSize="small" />
      </SpPaginationButton>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
}))

export default SpPagination
