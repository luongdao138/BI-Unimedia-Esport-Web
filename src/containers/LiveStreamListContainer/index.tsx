import HeaderWithButton from '@components/HeaderWithButton'
import ESSelect from '@components/Select'
import { Box, Grid, makeStyles, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
// import { FORMAT_YEAR_MONTH } from '@constants/common.constants'
// import moment from 'moment'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

const LiveStreamDataManage = [
  { id: 0, title: '総配信時間（ｈ）', value: '12' },
  { id: 1, title: '総視聴時間（ｈ）', value: '12' },
  { id: 2, title: '合計視聴者数', value: '180' },
  { id: 3, title: 'チャット人数', value: '150' },
  { id: 4, title: 'プレミアムチャット人数', value: '2' },
  { id: 5, title: 'eXeポイント受領総数', value: '1500' },
]

type StreamDataItemProps = {
  data?: any
  containerStyle?: any
}
const LiveStreamListContainer: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down(576))
  const { width: itemWidthMobile } = useWindowDimensions(48)

  const filterOptionsData = [
    { label: t('point_management_tab.choosing'), value: '' },
    { label: '2020年6月', value: '' },
    { label: '2020年5月', value: '' },
    { label: '2020年4月', value: '' },
  ]
  const [querySelected, setQuerySelected] = useState<string>(null)
  const [filterOptions, setFilterOptions] = useState(filterOptionsData)

  useEffect(() => {
    setFilterOptions(filterOptionsData)
  }, [])

  //set list filter
  // useEffect(() => {
  //   if (listFilterData) {
  //     setFilterOptions(filterOptionsData)
  //     const newObjects = listFilterData.map((item) => {
  //       return { label: moment(new Date(item)).format(FORMAT_YEAR_MONTH), value: moment(new Date(item)).format(FORMAT_YEAR_MONTH_FILTER) }
  //     })
  //     const newFilterData = filterOptionsData.concat(newObjects)
  //     setFilterOptions(newFilterData)
  //   }
  // }, [listFilterData])

  const handleSelectedQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuerySelected(event.target.value)
  }
  const StreamDataItem: React.FC<StreamDataItemProps> = ({ data, containerStyle }) => {
    return (
      <Box className={classes.itemContainer} style={containerStyle}>
        <Typography className={classes.titleStyle} style={{ display: 'inline-block' }}>
          {data?.title}
        </Typography>
        <Typography className={classes.numberStyle}>{FormatHelper.currencyFormat(data?.value)}</Typography>
      </Box>
    )
  }
  const renderItem = (item, index) => {
    return (
      <React.Fragment key={item?.id.toString() || index}>
        {isMobile ? (
          <Box style={{ display: 'flex', width: '100%', paddingLeft: 22, paddingRight: 22, paddingBottom: 20 }}>
            <StreamDataItem data={item} containerStyle={{ width: itemWidthMobile }} />
          </Box>
        ) : (
          <Grid item xs={6}>
            <StreamDataItem data={item} />
          </Grid>
        )}
      </React.Fragment>
    )
  }
  return (
    <div>
      <HeaderWithButton title={t('live_stream_list_screen.title')} />
      <Box className={classes.container}>
        <Grid item xs={12} md={7}>
          <ESSelect
            fullWidth
            placeholder={t('point_management_tab.choosing')}
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
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          {LiveStreamDataManage?.map(renderItem)}
        </Grid>
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  comboBox: {
    marginTop: 10,
  },
  titleStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 40,
  },
  numberStyle: {
    fontSize: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: Colors.white,
    wordBreak: 'break-word',
    textAlign: 'right',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
    border: `1px solid ${Colors.grey['200']}`,
    borderRadius: 4,
    padding: '8px 12px 8px 12px',
    height: '100%',
  },
  [theme.breakpoints.down(576)]: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      margin: 0,
      padding: '0 40px 0 40px',
    },
  },
}))
export default LiveStreamListContainer
