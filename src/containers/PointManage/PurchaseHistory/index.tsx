import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { FC, useState, useEffect } from 'react'
import { Colors } from '@theme/colors'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'
import PurchaseHistoryItem from '../PurchaseHistoryItem'
import usePointsManage from '../usePointsManage'
import ESLoader from '@components/Loader'

const PurchaseHistory: FC = () => {
  const classes = useStyles()
  const dataPurchasedPoints = Array(2)
    .fill('')
    .map((_, i) => ({
      id: `${i}`,
      serialNumber: `${i + 1}`,
      purchasedPointsId: 202106221234,
      points: 1000,
      expiresDatePurchased: '2022年04月09日',
    }))
  const filterOptionsData = [
    // { label: '選択中', value: '' },
    { label: i18n.t('common:point_management_tab.thirty_days_ago'), value: null },
    { label: '2020年6月', value: '2020年6月' },
    { label: '2020年5月', value: '2020年5月' },
    { label: '2020年4月', value: '2020年4月' },
  ]
  const letterCount = dataPurchasedPoints.length ? dataPurchasedPoints[dataPurchasedPoints.length - 1].serialNumber.length : 1

  const [page, setPage] = useState<number>(1)
  const [querySelected, setQuerySelected] = useState<string>(null)
  const { getHistoryPointData, meta_history_points } = usePointsManage()

  const params = {
    page: page,
    limit: 10,
    period: querySelected,
  }
  useEffect(() => {
    getHistoryPointData(params)
  }, [page])

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }
  const handleSelectedQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuerySelected(event.target.value)
  }
  return (
    <Box className={classes.container}>
      <Grid item xs={12} md={7}>
        <ESSelect
          fullWidth
          placeholder={i18n.t('common:point_management_tab.choosing')}
          defaultValue={null}
          displayEmpty
          size="big"
          name={'query'}
          disabled={false}
          className={classes.comboBox}
          value={querySelected}
          onChange={handleSelectedQuery}
        >
          <option disabled value={-1}>
            {i18n.t('common:point_management_tab.choosing')}
          </option>
          {filterOptionsData.map((rule, index) => (
            <option key={index} value={rule.value}>
              {rule.label}
            </option>
          ))}
        </ESSelect>
      </Grid>
      {meta_history_points.pending ? (
        <Grid item xs={12}>
          <Box className={classes.loadingContainer}>
            <ESLoader />
          </Box>
        </Grid>
      ) : (
        <Box className={`${classes.wrapContent} ${dataPurchasedPoints?.length > 0 && classes.spacingBottom}`}>
          {dataPurchasedPoints?.length > 0 ? (
            <>
              {dataPurchasedPoints.map((item, i) => (
                <PurchaseHistoryItem data={item} key={i} letterCount={letterCount} />
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
      )}
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  comboBox: {},
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
  },
}))
export default PurchaseHistory
