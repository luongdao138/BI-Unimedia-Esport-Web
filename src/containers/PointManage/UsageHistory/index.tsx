import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { Pagination } from '@material-ui/lab'
import UsagePointsItem from '../UsagePointsItem'

export interface UsagePointDataProps {
  serialNumber: string
  purchasedPointsId: number
  points: number
  expiresDatePurchased: string
  type: string
}
const UsageHistory: FC = () => {
  const classes = useStyles()
  const dataUsagePoints = Array(3)
    .fill('')
    .map((_, i) => ({
      id: `${i}`,
      serialNumber: `${i + 1}`,
      purchasedPointsId: 202106221234,
      points: 1000,
      expiresDatePurchased: '2022年04月09日',
      type: 'used',
    }))
  const dataPurchasePoints = Array(1)
    .fill('')
    .map((_, i) => ({
      id: `${i}`,
      serialNumber: `${i + 1}`,
      purchasedPointsId: 202106221234,
      points: 1000,
      expiresDatePurchased: '2022年04月09日',
      type: 'purchase',
    }))
  const filterOptionsData = [
    { label: '選択中', value: '' },
    { label: i18n.t('common:point_management_tab.thirty_days_ago'), value: i18n.t('common:point_management_tab.thirty_days_ago') },
    { label: '2020年6月', value: '2020年6月' },
    { label: '2020年5月', value: '2020年5月' },
    { label: '2020年4月', value: '2020年4月' },
  ]
  const letterCount = dataPurchasePoints.length ? dataPurchasePoints[dataPurchasePoints.length - 1].serialNumber.length : 1
  return (
    <Box className={classes.container}>
      {dataUsagePoints.length > 0 ? (
        <Box className={classes.headerContainer}>
          <Typography className={classes.headerTitle}>
            {i18n.t('common:point_management_tab.purchase_point') + i18n.t('common:point_management_tab.id')}「202106272123」
            {i18n.t('common:point_management_tab.title_usage_history')}
          </Typography>
        </Box>
      ) : (
        <Grid item xs={7}>
          <ESSelect
            fullWidth
            placeholder={i18n.t('common:point_management_tab.choosing')}
            displayEmpty
            size="big"
            disabled={false}
            className={classes.comboBox}
          >
            {filterOptionsData.map((rule, index) => (
              <option key={index} value={rule.value}>
                {rule.label}
              </option>
            ))}
          </ESSelect>
        </Grid>
      )}
      <Box className={classes.wrapContent}>
        {dataPurchasePoints.length > 0 && (
          <>
            <Box className={classes.typePurchaseContainer}>
              <Typography>{i18n.t('common:point_management_tab.purchase_information')}</Typography>
            </Box>
            {dataPurchasePoints.map((item, i) => (
              <UsagePointsItem data={item} key={i} letterCount={letterCount} />
            ))}
          </>
        )}
        {dataUsagePoints.length > 0 && (
          <>
            <Box className={classes.typeUsageContainer}>
              <Typography>{i18n.t('common:point_management_tab.usage_details')}</Typography>
            </Box>
            {dataUsagePoints.map((item, i) => (
              <UsagePointsItem data={item} key={i} letterCount={letterCount} />
            ))}
          </>
        )}
        {(dataPurchasePoints.length <= 0 || dataUsagePoints.length <= 0) && (
          <Box className={classes.noDataContainer}>
            <Typography className={classes.noDataText}>{i18n.t('common:point_management_tab.no_data_text')}</Typography>
          </Box>
        )}
      </Box>
      <Box className={classes.paginationContainer}>
        <Pagination
          showFirstButton
          showLastButton
          defaultPage={1}
          count={3}
          variant="outlined"
          shape="rounded"
          className={classes.paginationStyle}
        />
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    color: Colors.white_opacity['70'],
    textAlign: 'center',
  },
  typePurchaseContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: 24,
    marginBottom: 24,
  },
  typeUsageContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: 24,
    marginBottom: 24,
  },
  comboBox: {},
  container: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  wrapContent: {
    backgroundColor: Colors.black,
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey['200'],
    borderStyle: 'solid',
    marginTop: 18,
    paddingBottom: 18,
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
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
    },
    '& .MuiPaginationItem-ranges': {},
  },
  noDataContainer: {
    backgroundColor: Colors.white_opacity['6'],
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 4,
    padding: 16,
  },
  noDataText: {
    color: Colors.white_opacity['70'],
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
