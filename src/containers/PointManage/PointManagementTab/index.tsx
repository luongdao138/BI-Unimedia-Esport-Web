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
  const { getMyPointData, meta_my_points, myPointsData } = usePointsManage()
  const totalPages = Math.ceil(myPointsData?.total / 10)
  const isLoading = meta_my_points.pending
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(475))

  const limit = 10
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    getMyPointData({ page: page, limit: limit })
  }, [page])

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }
  return (
    <Box className={classes.container}>
      <Box>
        <MyPointsCard my_points={myPointsData?.total_point ? myPointsData?.total_point : 0} />
      </Box>
      <Box className={`${classes.wrapContent} ${myPointsData?.aggregate_points?.length > 0 && classes.spacingBottom} `}>
        {myPointsData?.aggregate_points?.length > 0 ? (
          <>
            {myPointsData?.aggregate_points.map((item, i) => (
              <PointsPurchasedItem key={item?.uuid || i} data={item} serialNumber={page > 1 ? (page - 1) * limit + i + 1 : i + 1} />
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
            <Typography className={classes.noDataText}>{i18n.t('common:point_management_tab.no_data_point_active_tab')}</Typography>
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
    marginTop: 16,
  },
  spacingBottom: {
    paddingBottom: 8,
  },
  paginationContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  noDataContainer: {
    backgroundColor: '#171717',
    alignItems: 'center',
    margin: 8,
    borderRadius: 4,
  },
  noDataText: {
    padding: 8,
  },
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
  [theme.breakpoints.down(375)]: {
    paginationStyle: {
      '& .MuiPaginationItem-root': {
        fontSize: '11px',
      },
    },
  },
}))
export default PointManagementTab
