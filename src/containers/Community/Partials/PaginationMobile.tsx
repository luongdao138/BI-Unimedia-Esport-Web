// import { useState } from 'react'
import { Box, ButtonBase, makeStyles, Icon, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { SetStateAction, Dispatch } from 'react'

type Props = {
  page?: number
  pageNumber?: number
  setPage?: Dispatch<SetStateAction<number>>
}

const Pagination: React.FC<Props> = ({ page, pageNumber, setPage }) => {
  const classes = useStyles()

  const firstPage = () => {
    setPage(1)
  }
  const previousPage = () => {
    setPage(page - 1)
  }
  const nextPage = () => {
    setPage(page + 1)
  }
  const lastPage = () => {
    setPage(pageNumber)
  }

  return (
    <Box>
      <Box className={classes.pagination}>
        <ButtonBase className={classes.buttons} onClick={firstPage} disabled={page === 1}>
          <Icon className={`${classes.icons} fas fa-angle-double-left`} />
        </ButtonBase>
        <ButtonBase className={classes.buttons} onClick={previousPage} disabled={page === 1}>
          <Icon className={`${classes.icons} fas fa-chevron-left`} />
        </ButtonBase>
        <ButtonBase className={classes.pageButton} disabled={false}>
          <Typography className={classes.pageText}>{page}</Typography>
        </ButtonBase>
        <ButtonBase className={classes.buttons} onClick={nextPage} disabled={page === pageNumber}>
          <Icon className={`${classes.icons} fas fa-chevron-right`} />
        </ButtonBase>
        <ButtonBase className={classes.buttons} onClick={lastPage} disabled={page === pageNumber}>
          <Icon className={`${classes.icons} fas fa-angle-double-right`} />
        </ButtonBase>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  pagination: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttons: {
    margin: 3,
    border: '1px solid',
    borderColor: Colors.primary,
    borderRadius: 4,
    width: 32,
    height: 32,
    color: Colors.white,
    transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:disabled': {
      opacity: 0.38,
      cursor: 'default',
    },
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
  },
  pageButton: {
    margin: 3,
    border: '1px solid',
    borderColor: Colors.primary,
    borderRadius: 4,
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
  },
  icons: {
    fontSize: 10,
  },
  pageText: {
    fontWeight: 400,
    fontSize: 12,
    boxSizing: 'border-box',
    lineHeight: 1.43,
    textAlign: 'center',
    color: Colors.white,
  },
}))

export default Pagination
