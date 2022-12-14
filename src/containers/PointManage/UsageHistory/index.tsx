import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC, useState, useEffect } from 'react'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { Pagination } from '@material-ui/lab'
import UsagePointsItem from '../UsagePointsItem'
import usePointsManage from '../usePointsManage'
import ESLoader from '@components/FullScreenLoader'
import moment from 'moment'
import PurchaseHistoryItem from '../PurchaseHistoryItem'
import UsagePointDetailItem from '../UsagePointDetailItem'
import { FORMAT_YEAR_MONTH, FORMAT_YEAR_MONTH_FILTER } from '@constants/common.constants'

export interface UsagePointDataProps {
  serialNumber: string
  purchasedPointsId: number
  points: number
  expiresDatePurchased: string
  type: string
}

const UsageHistory: FC = () => {
  const classes = useStyles()
  const filterOptionsData = [{ label: i18n.t('common:point_management_tab.thirty_days_ago'), value: '' }]
  const limit = 10
  const [page, setPage] = useState<number>(1)
  const [pageDetail, setPageDetail] = useState<number>(1)
  const [querySelected, setQuerySelected] = useState<string>(null)
  const [filterOptions, setFilterOptions] = useState(filterOptionsData)
  const [usageHistoryDetail, setUsageHistoryDetail] = useState<boolean>(false)
  const [purchasePointId, setPurchasePointId] = useState<number>(null)
  const {
    getUsedPointData,
    meta_used_points,
    usedPointsData,
    getUsagePointsHistoryData,
    meta_used_points_detail,
    usagePointsHistoryDetail,
  } = usePointsManage()

  const listFilterData = usedPointsData?.date_use_points
  const listUsageHistoryData = usedPointsData?.points
  const totalPages = Math.ceil(usedPointsData?.total / 10)

  const detailUsageHistory = usagePointsHistoryDetail
  const UsagePointsHistoryData = usagePointsHistoryDetail?.point_history
  const totalPagesDetail = Math.ceil(usagePointsHistoryDetail?.total / 10)
  const isLoading = meta_used_points.pending || meta_used_points_detail.pending
  const PurchaseData = {
    uuid: usagePointsHistoryDetail?.uuid,
    point: usagePointsHistoryDetail?.point,
    created_at: usagePointsHistoryDetail?.created_at,
    expired_date: usagePointsHistoryDetail?.valid_until,
    divide: '',
  }

  useEffect(() => {
    getUsedPointData(
      querySelected
        ? { page: page, limit: limit, type: 2, period: querySelected }
        : {
            page: page,
            limit: limit,
            type: 2,
          }
    )
  }, [page, querySelected])

  //set list filter
  useEffect(() => {
    if (listFilterData) {
      setFilterOptions(filterOptionsData)
      const newObjects = listFilterData.map((item) => {
        return { label: moment(new Date(item)).format(FORMAT_YEAR_MONTH), value: moment(new Date(item)).format(FORMAT_YEAR_MONTH_FILTER) }
      })
      const newFilterData = filterOptionsData.concat(newObjects)
      setFilterOptions(newFilterData)
    }
  }, [listFilterData])

  useEffect(() => {
    if (usageHistoryDetail) {
      getUsagePointsHistoryData({ page: pageDetail, limit: limit, uuid: purchasePointId })
    }
  }, [purchasePointId, usageHistoryDetail, pageDetail])

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
  }
  const onChangePageDetail = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setPageDetail(value)
  }
  const handleSelectedQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuerySelected(event.target.value)
    setPage(1)
  }

  return (
    <Box className={classes.container}>
      {!usageHistoryDetail && (
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
      )}
      {/* Title Header */}
      {usageHistoryDetail && (
        <Box className={classes.headerContainer}>
          <Typography className={classes.headerTitle}>
            {i18n.t('common:point_management_tab.purchase_point') + i18n.t('common:point_management_tab.id')}???{purchasePointId}???
            {i18n.t('common:point_management_tab.title_usage_history')}
          </Typography>
        </Box>
      )}
      {/* Content */}
      <Box className={`${classes.wrapContent} ${listUsageHistoryData?.length > 0 && classes.spacingBottom}`}>
        {/* Show detail usage point history */}
        {usageHistoryDetail && (
          <Box>
            <>
              <Box className={classes.typePurchaseContainer}>
                <Typography>{i18n.t('common:point_management_tab.purchase_information')}</Typography>
              </Box>
              {detailUsageHistory && <PurchaseHistoryItem serialNumber={1} data={PurchaseData} type={'usage'} />}
              <Box className={classes.typeUsageContainer}>
                <Typography>{i18n.t('common:point_management_tab.usage_details')}</Typography>
              </Box>
              <>
                {UsagePointsHistoryData?.length > 0 ? (
                  <>
                    {UsagePointsHistoryData?.map((item, index) => (
                      <UsagePointDetailItem
                        key={item?.id || index}
                        data={item}
                        serialNumber={pageDetail > 1 ? (pageDetail - 1) * limit + index + 1 : index + 1}
                      />
                    ))}
                    {totalPagesDetail > 1 && (
                      <Box className={classes.paginationContainer}>
                        <Pagination
                          showFirstButton
                          showLastButton
                          defaultPage={1}
                          page={pageDetail}
                          count={totalPagesDetail}
                          variant="outlined"
                          shape="rounded"
                          className={classes.paginationStyle}
                          siblingCount={1}
                          boundaryCount={1}
                          onChange={onChangePageDetail}
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <Box className={classes.noDataContainer}>
                    <Typography className={classes.noDataText}>
                      {i18n.t('common:point_management_tab.no_data_usage_point_history')}
                    </Typography>
                  </Box>
                )}
              </>
            </>
          </Box>
        )}
        {/* Show item purchase point history */}
        {!usageHistoryDetail && (
          <Box>
            <>
              {listUsageHistoryData?.length > 0 ? (
                <>
                  {listUsageHistoryData?.map((item, i) => (
                    <UsagePointsItem
                      key={item?.uuid || i}
                      data={item}
                      maxPage={(page - 1) * limit + listUsageHistoryData.length}
                      serialNumber={page > 1 ? (page - 1) * limit + i + 1 : i + 1}
                      setShowDetail={setUsageHistoryDetail}
                      setPurchasePointId={setPurchasePointId}
                    />
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
                  <Typography className={classes.noDataText}>
                    {i18n.t('common:point_management_tab.no_data_usage_point_history')}
                  </Typography>
                </Box>
              )}
            </>
          </Box>
        )}
      </Box>
      {isLoading && <ESLoader open={isLoading} />}
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  loadingContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  spacingBottom: {
    paddingBottom: 8,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    marginTop: 8,
  },
  headerTitle: {
    color: Colors.white_opacity['70'],
    textAlign: 'center',
  },
  typePurchaseContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: 16,
    marginBottom: 16,
  },
  typeUsageContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: 16,
    marginBottom: 16,
  },
  comboBox: {},
  container: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
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
  paginationContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 30,
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
  noDataContainer: {
    backgroundColor: '#171717',
    alignItems: 'center',
    margin: 8,
    borderRadius: 4,
  },
  noDataText: {
    color: Colors.white_opacity['70'],
    padding: 8,
  },
  [theme.breakpoints.down(375)]: {
    typePurchaseContainer: {
      margin: '8px 0',
    },
    typeUsageContainer: {
      margin: '8px 0',
    },
    wrapContent: {
      paddingBottom: 8,
    },
    headerTitle: {
      fontSize: 13,
    },
  },
}))
export default UsageHistory
