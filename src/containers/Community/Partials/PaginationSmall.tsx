import { Box, ButtonBase, makeStyles, Icon, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { SetStateAction, Dispatch } from 'react'

type Props = {
  page: number
  pageNumber: number
  setPage: Dispatch<SetStateAction<number>>
  disabled?: boolean
}

const PAGE_VALUES = {
  FIRST_PAGE: 1,
}

const PaginationSmall: React.FC<Props> = ({ page, pageNumber, setPage, disabled }) => {
  const classes = useStyles()

  const firstPage = () => {
    setPage(PAGE_VALUES.FIRST_PAGE)
  }
  const previousPage = () => {
    setPage(page - PAGE_VALUES.FIRST_PAGE)
  }
  const nextPage = () => {
    setPage(page + PAGE_VALUES.FIRST_PAGE)
  }
  const lastPage = () => {
    setPage(pageNumber)
  }

  return (
    <Box>
      <Box className={classes.pagination}>
        <ButtonBase className={classes.buttons} onClick={firstPage} disabled={page === PAGE_VALUES.FIRST_PAGE || disabled}>
          <Icon className={`${classes.icons} fas fa-angle-double-left`} />
        </ButtonBase>
        <ButtonBase className={classes.buttons} onClick={previousPage} disabled={page === PAGE_VALUES.FIRST_PAGE || disabled}>
          <Icon className={`${classes.icons} fas fa-chevron-left`} />
        </ButtonBase>
        <ButtonBase className={classes.pageButton} disabled={true}>
          <Typography className={classes.pageText}>{page}</Typography>
        </ButtonBase>
        <ButtonBase className={classes.buttons} onClick={nextPage} disabled={page === pageNumber || disabled}>
          <Icon className={`${classes.icons} fas fa-chevron-right`} />
        </ButtonBase>
        <ButtonBase className={classes.buttons} onClick={lastPage} disabled={page === pageNumber || disabled}>
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
    transition:
      'color 250ms cubic-bezier(0.4, 0, 0.2, PAGE_VALUES.FIRST_PAGE) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, PAGE_VALUES.FIRST_PAGE) 0ms',
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

export default PaginationSmall
