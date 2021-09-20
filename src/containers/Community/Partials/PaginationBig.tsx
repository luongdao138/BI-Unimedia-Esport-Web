import { Box, ButtonBase, makeStyles, Icon, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { SetStateAction, Dispatch } from 'react'
import _ from 'lodash'
import { useState, useEffect } from 'react'

type Props = {
  page?: number
  pageNumber?: number
  setPage?: Dispatch<SetStateAction<number>>
  disabled?: boolean
}

const PaginationBig: React.FC<Props> = ({ page, pageNumber, setPage, disabled }) => {
  const classes = useStyles()

  const firstPage = () => {
    setPage(1)
  }

  const lastPage = () => {
    setPage(pageNumber)
  }

  const leftCount = () => {
    return page - 1
  }

  const rightCount = () => {
    return pageNumber - page
  }
  const [buttons, setButtons] = useState([])

  const renderPagination = () => {
    const temp_array = []
    const three_dots = { number: null }
    temp_array.push({ number: 1 })
    if (pageNumber <= 7) {
      for (let i = 2; i <= pageNumber - 1; i++) {
        const temp = { number: i }
        temp_array.push(temp)
      }
    } else {
      if (leftCount() < 4) {
        for (let i = 2; i <= 5; i++) {
          const temp = { number: i }
          temp_array.push(temp)
        }
        temp_array.push(three_dots)
      } else if (rightCount() < 4) {
        temp_array.push(three_dots)
        for (let i = pageNumber - 4; i < pageNumber; i++) {
          const temp = { number: i }
          temp_array.push(temp)
        }
      } else if (rightCount() > 3 && leftCount() > 3) {
        temp_array.push(three_dots)
        for (let i = page - 1; i <= page + 1; i++) {
          const temp = { number: i }
          temp_array.push(temp)
        }
        temp_array.push(three_dots)
      }
    }
    pageNumber !== 1 && temp_array.push({ number: pageNumber })
    setButtons(temp_array)
  }

  useEffect(() => {
    renderPagination()
  }, [pageNumber, page])

  return (
    <Box>
      <Box className={classes.pagination}>
        <ButtonBase className={classes.buttons} onClick={firstPage} disabled={page === 1 || disabled}>
          <Icon className={`${classes.icons} fas fa-angle-double-left`} />
        </ButtonBase>

        {_.map(buttons, (button) => {
          return (
            <ButtonBase
              className={`${classes.pageButton} ${page === button.number && classes.activeButton}`}
              onClick={() => {
                setPage(button.number)
              }}
              disabled={disabled}
            >
              <Typography className={classes.pageText}>{button.number === null ? '...' : button.number}</Typography>
            </ButtonBase>
          )
        })}

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

export default PaginationBig
