import { Box, Grid, makeStyles, Theme } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { FC } from 'react'
import { Colors } from '@theme/colors'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'
import PurchaseHistoryItem from '../PurchaseHistoryItem'

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
    { label: '選択中', value: '' },
    { label: i18n.t('common:point_management_tab.thirty_days_ago'), value: i18n.t('common:point_management_tab.thirty_days_ago') },
    { label: '2020年6月', value: '2020年6月' },
    { label: '2020年5月', value: '2020年5月' },
    { label: '2020年4月', value: '2020年4月' },
  ]
  return (
    <Box className={classes.container}>
      <Grid item xs={12} md={7}>
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
      <Box className={classes.wrapContent}>
        {dataPurchasedPoints.map((item, i) => (
          <PurchaseHistoryItem data={item} key={i} />
        ))}
      </Box>
      <Box className={classes.paginationContainer}>
        <Pagination 
          showFirstButton showLastButton
          defaultPage={1} count={3} variant="outlined" shape="rounded" className={classes.paginationStyle}
        />
      </Box>
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
  [theme.breakpoints.down(375)]: {
    wrapContent: {
      paddingBottom: 0,
    },
  },
}))
export default PurchaseHistory
