import { Box, makeStyles, Theme, Grid, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { FC, useEffect, useState } from 'react'
import { Colors } from '@theme/colors'
import PointsPurchasedItem from '../PointsPurchasedItem'
import MyPointsCard from '../MyPointsCard'
import usePointsManage from '../usePointsManage'
import ESLoader from '@components/Loader'
import i18n from '@locales/i18n'

export interface PointsPurchasedDataProps {
  serialNumber: string
  purchasedPointsId: number
  points: number
  expiresDatePurchased: string
}

const PointManagementTab: FC = () => {
  const classes = useStyles()
  const dataPurchasedPoints = Array(2)
    .fill('')
    .map((_, i) => ({
      serialNumber: `${i + 1}`,
      purchased_id: 202106221234,
      amount: 1000,
      valid_until: '2022年04月09日',
    }))
  const [page, setPage] = useState<number>(1)
  const { getMyPointData, meta_my_points, myPointsData } = usePointsManage()

  const totalMyPoints = myPointsData?.total_point
  const listMyPointsData = myPointsData?.aggregate_points
  // const listMyPointsData = Array(2)
  //   .fill('')
  //   .map((_, i) => ({
  //     serialNumber: `${i + 1}`,
  //     purchased_id: 202106221234,
  //     amount: 1000,
  //     valid_until: '2022年04月09日',
  //   }))
  const params = {
    page: page,
    limit: 10,
  }
  useEffect(() => {
    getMyPointData(params)
  }, [page])

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }
  const letterCount = dataPurchasedPoints.length ? dataPurchasedPoints[dataPurchasedPoints.length - 1].serialNumber.length : 1
  return (
    <Box className={classes.container}>
      {meta_my_points.pending ? (
        <Grid item xs={12}>
          <Box className={classes.loadingContainer}>
            <ESLoader />
          </Box>
        </Grid>
      ) : (
        <>
          <Box>{totalMyPoints && <MyPointsCard my_points={totalMyPoints} />}</Box>
          <Box className={`${classes.wrapContent} ${listMyPointsData?.length > 0 && classes.spacingBottom} `}>
            {listMyPointsData?.length > 0 ? (
              <>
                {listMyPointsData.map((item, i) => (
                  <PointsPurchasedItem data={item} key={i} serialNumber={i} letterCount={letterCount} />
                ))}
                <Box className={classes.paginationContainer}>
                  <Pagination
                    showFirstButton
                    showLastButton
                    defaultPage={1}
                    page={page}
                    count={3}
                    variant="outlined"
                    shape="rounded"
                    className={classes.paginationStyle}
                    onChange={onChangePage}
                  />
                </Box>
              </>
            ) : (
              <Box className={classes.noDataContainer}>
                <Typography className={classes.noDataText}>{i18n.t('common:point_management_tab.no_data_purchase_point')}</Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
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
    justifyContent: 'center',
  },
  spacingBottom: {
    paddingBottom: 24,
  },
  paginationContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    // paddingBottom: 30,
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
  },
}))
export default PointManagementTab
