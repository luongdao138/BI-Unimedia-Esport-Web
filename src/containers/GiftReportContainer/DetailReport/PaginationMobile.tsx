import { Box, ButtonBase, makeStyles, Icon, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { SetStateAction, Dispatch } from 'react'
import _ from 'lodash'
import { useState, useEffect } from 'react'

const PAGE_VALUES = {
  FIRST_PAGE: 1,
  SECOND_PAGE: 2,
  THREE_DOTS_THRESHOLD: 3,
  DOTS_RIGHT_THRESHOLD: 5,
  NO_DOT_THRESHOLD: 3,
}

type Props = {
  page: number
  pageNumber: number
  setPage: Dispatch<SetStateAction<number>>
  disabled?: boolean
}

const PaginationMobile: React.FC<Props> = ({ page, pageNumber, setPage, disabled }) => {
  const classes = useStyles()
  const previousPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }
  const firstPage = () => {
    setPage(PAGE_VALUES.FIRST_PAGE)
  }

  const lastPage = () => {
    setPage(pageNumber)
  }
  const [buttons, setButtons] = useState([])
  const renderPagination = () => {
    const temp_array = []
    if (page) {
      const temp = { number: page }
      temp_array.push(temp)
    }
    setButtons(temp_array)
  }

  useEffect(() => {
    renderPagination()
  }, [pageNumber, page])

  return (
    pageNumber > 1 && (
      <Box>
        <Box className={classes.pagination}>
          <ButtonBase className={classes.buttons} onClick={firstPage} disabled={page === 1 || disabled}>
            {/* <Icon className={`${classes.icons} fas fa-angle-double-left`} /> */}
            <Icon className={`fas fa-angle-double-left ${classes.icons}`} fontSize="small" />
          </ButtonBase>
          <ButtonBase className={classes.buttons} onClick={previousPage} disabled={page === 1 || disabled}>
            {/* <Icon className={`${classes.icons} fas fa-angle-double-left`} /> */}
            <Icon className={`fa fa-angle-left ${classes.icons}`} fontSize="small" />
          </ButtonBase>

          {_.map(buttons, (button, i) => {
            return (
              <ButtonBase
                key={i}
                className={`${classes.pageButton} ${page === button.number && classes.activeButton}`}
                onClick={() => {
                  setPage(button.number)
                }}
                disabled={disabled || button.number === null}
              >
                <Typography className={classes.pageText}>{button.number === null ? '...' : button.number}</Typography>
              </ButtonBase>
            )
          })}

          <ButtonBase className={classes.buttons} onClick={nextPage} disabled={page === pageNumber || disabled}>
            <Icon className={`fa fa-angle-right ${classes.icons}`} fontSize="small" />
          </ButtonBase>

          <ButtonBase className={classes.buttons} onClick={lastPage} disabled={page === pageNumber || disabled}>
            {/* <Icon className={`${classes.icons} fas fa-angle-double-right`} /> */}
            <Icon className={`fas fa-angle-double-right ${classes.icons}`} fontSize="small" />
          </ButtonBase>
        </Box>
      </Box>
    )
  )
}

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttons: {
    margin: 3,
    border: '1px solid',
    borderColor: Colors.primary,
    borderRadius: 4,
    width: theme.spacing(4),
    height: theme.spacing(4),
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
    width: theme.spacing(4),
    height: theme.spacing(4),
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
  activeButton: {
    backgroundColor: Colors.primary,
  },
}))

export default PaginationMobile
