import { Box, makeStyles, Theme, Typography, useTheme } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { FC, useEffect, useState } from 'react'
import { Colors } from '@theme/colors'
import PointsPurchasedItem from '../PointsPurchasedItem'
import MyPointsCard from '../MyPointsCard'
import usePointsManage from '../usePointsManage'
import ESLoader from '@components/FullScreenLoader'
import i18n from '@locales/i18n'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const PointManagementTab: FC = () => {
  const classes = useStyles()
  const { getMyPointData, meta_my_points, myPointsData, resetMyPointsActive } = usePointsManage()
  const totalMyPoints = myPointsData?.total_point
  const listMyPointsData = myPointsData?.aggregate_points
  const totalPages = Math.ceil(myPointsData?.total / 10)
  const isLoading = meta_my_points.pending
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(475))

  const limit = 10
  const [page, setPage] = useState<number>(1)

  const params = {
    page: page,
    limit: limit,
  }
  useEffect(() => {
    getMyPointData(params)
    return () => {
      resetMyPointsActive()
    }
  }, [page])

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }
  return (
    <Box className={classes.container}>
      <Box>
        <MyPointsCard my_points={totalMyPoints ? totalMyPoints : 0} />
      </Box>
      <Box className={`${classes.wrapContent} ${listMyPointsData?.length > 0 && classes.spacingBottom} `}>
        {listMyPointsData?.length > 0 ? (
          <>
            {listMyPointsData.map((item, i) => (
              <PointsPurchasedItem data={item} key={i} serialNumber={page > 1 ? (page - 1) * limit + i + 1 : i + 1} />
            ))}
            {totalPages > 1 && (
              <Box className={classes.paginationContainer}>
                <Pagination
                  showFirstButton
                  showLastButton
                  defaultPage={1}
                  page={page}
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  className={classes.paginationStyle}
                  onChange={onChangePage}
                  siblingCount={1}
                  size={isSmallScreen ? 'small' : 'medium'}
                />
              </Box>
            )}
          </>
        ) : (
          <Box className={classes.noDataContainer}>
            <Typography className={classes.noDataText}>{i18n.t('common:point_management_tab.no_data_purchase_point')}</Typography>
          </Box>
        )}
      </Box>
      {isLoading && <ESLoader open={isLoading} />}
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  loadingContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  wrapContent: {
    backgroundColor: Colors.black,
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey['200'],
    borderStyle: 'solid',
    marginTop: 18,
  },
  spacingBottom: {
    paddingBottom: 24,
  },
  paginationContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  noDataContainer: {
    backgroundColor: '#171717',
    alignItems: 'center',
    margin: 16,
    borderRadius: 4,
  },
  noDataText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
  paginationStyle: {
    '& .MuiPaginationItem-root': {
      color: Colors.white,
      borderColor: Colors.primary,
      borderWidth: 1,
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
    },
    '& .MuiPaginationItem-ranges': {},
  },
  [theme.breakpoints.down(375)]: {
    wrapContent: {
      paddingBottom: 0,
    },
    paginationStyle: {
      '& .MuiPaginationItem-root': {
        minWidth: '22px',
        minHeight: '22px',
      },
    },
  },
}))
export default PointManagementTab
