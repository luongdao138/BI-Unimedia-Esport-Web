import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { FC, useState, useEffect } from 'react'
import { Colors } from '@theme/colors'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'
import PurchaseHistoryItem from '../PurchaseHistoryItem'
import usePointsManage from '../usePointsManage'
import ESLoader from '@components/FullScreenLoader'
import moment from 'moment'
import { FORMAT_YEAR_MONTH } from '@constants/common.constants'

export type FilterOptionsParams = {
  label: string
  value: string
}
const PurchaseHistory: FC = () => {
  const classes = useStyles()

  const filterOptionsData = [{ label: i18n.t('common:point_management_tab.thirty_days_ago'), value: '' }]

  const limit = 10
  const [page, setPage] = useState<number>(1)
  const [querySelected, setQuerySelected] = useState<string>('')
  const [filterOptions, setFilterOptions] = useState(filterOptionsData)
  const { getHistoryPointData, meta_history_points, historyPointsData, resetPointsHistory } = usePointsManage()

  const listFilterData = historyPointsData?.date_by_points
  const listPurchaseHistoryData = historyPointsData?.points
  const totalPages = Math.ceil(historyPointsData?.total / 10)
  const isLoading = meta_history_points.pending

  useEffect(() => {
    getHistoryPointData(
      querySelected ? { page: page, limit: limit, type: 1, period: querySelected } : { page: page, limit: limit, type: 1 }
    )
    return () => {
      resetPointsHistory()
    }
  }, [page, querySelected])

  useEffect(() => {
    if (listFilterData) {
      setFilterOptions(filterOptionsData)
      const newObjects = listFilterData.map((item) => {
        return { label: moment(item).format(FORMAT_YEAR_MONTH), value: item }
      })
      const newFilterData = filterOptionsData.concat(newObjects)
      setFilterOptions(newFilterData)
    }
  }, [listFilterData])

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }
  const handleSelectedQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuerySelected(event.target.value)
    setPage(1)
  }
  return (
    <Box className={classes.container}>
      <Grid item xs={12} md={7}>
        <ESSelect
          fullWidth
          placeholder={i18n.t('common:point_management_tab.choosing')}
          displayEmpty
          size="big"
          name={'query'}
          disabled={false}
          className={classes.comboBox}
          value={querySelected}
          onChange={handleSelectedQuery}
        >
          {filterOptions &&
            filterOptions.map((rule, index) => (
              <option key={index} value={rule.value}>
                {rule.label}
              </option>
            ))}
        </ESSelect>
      </Grid>
      <Box className={`${classes.wrapContent} ${listPurchaseHistoryData?.length > 0 && classes.spacingBottom}`}>
        {listPurchaseHistoryData?.length > 0 ? (
          <>
            {listPurchaseHistoryData.map((item, i) => (
              <PurchaseHistoryItem data={item} key={i} serialNumber={page > 1 ? (page - 1) * limit + i + 1 : i + 1} />
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
  comboBox: {},
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
  },
}))
export default PurchaseHistory
