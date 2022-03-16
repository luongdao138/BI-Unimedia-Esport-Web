import ESButton from '@components/Button'
import ExportCSV from '@components/ExportCSV'
import ESLoader from '@components/Loader'
import ESTable from '@components/Table'
import Pagination from '@containers/Community/Partials/Pagination'
import { Box, makeStyles, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { DetailedReportParams } from '@services/deliveryReport.service'
import { Colors } from '@theme/colors'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { DateHelper } from '@utils/helpers/DateHelper'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useDeliveryReport from '../useDeliveryReport'

interface DetailReportProps {
  videoId: string | string[]
}

const ITEM_PER_PAGE = 30
// const getItemPerPage = (data: DetailedResponse[], itemPerPage: number, page: number) => {
//   return data.slice(itemPerPage * page - itemPerPage, itemPerPage * page)
// }

const headers = [
  { label: 'No.', key: 'no' },
  { label: '購入日時', key: 'created_at' },
  { label: 'eXeLAB ID', key: 'nickname' },
  { label: 'eXeポイント', key: 'point' },
  { label: '種別', key: 'type_report' },
  { label: 'チップ対象', key: 'gift_recipient' },
]

const DetailReport: React.FC<DetailReportProps> = ({ videoId }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { fetchDetailedReportList, detailedReports, detailedReportMeta } = useDeliveryReport()

  const getTotalPage = () => Math.ceil(detailedReports.total / ITEM_PER_PAGE)
  const [page, setPage] = useState(1)
  // const { t } = useTranslation('common')
  useEffect(() => {
    const paramDeliveryReport: DetailedReportParams = { uuid: videoId, page: page, limit: ITEM_PER_PAGE }
    fetchDetailedReportList(paramDeliveryReport)
  }, [page])

  const renderBtnCSV = () =>
    matches ? (
      <ESButton variant={'contained'} className={classes.btnCSV}>
        <ExportCSV
          headers={headers}
          data={CommonHelper.addSttDataList(detailedReports.points, ITEM_PER_PAGE, page)}
          className={classes.textBtnCSV}
          fileName={'report-detail.csv'}
          textExport={t('streaming_gift_report_screen.csv')}
        ></ExportCSV>
      </ESButton>
    ) : (
      <ESButton variant={'contained'} className={classes.btnCSV}>
        <ExportCSV
          headers={headers}
          data={CommonHelper.addSttDataList(detailedReports.points, ITEM_PER_PAGE, page)}
          className={classes.textBtnCSV}
          fileName={'report-detail.csv'}
          textExport={t('streaming_gift_report_screen.csv_download')}
        ></ExportCSV>
      </ESButton>
    )

  const renderPagination = () =>
    matches ? (
      <Pagination page={page} pageNumber={getTotalPage()} setPage={setPage} />
    ) : (
      <Pagination page={page} pageNumber={getTotalPage()} setPage={setPage} />
    )

  return (
    <Box mb={4}>
      <Box display="flex" justifyContent="space-between" alignItems="baseline" mb={2}>
        <Box alignItems="center">
          <Box mb={3} display="flex" justifyContent="center">
            {renderPagination()}
          </Box>
        </Box>
        {renderBtnCSV()}
      </Box>
      {detailedReportMeta.pending ? (
        <Box className={classes.loaderCenter}>
          <ESLoader />
        </Box>
      ) : (
        <>
          {detailedReports.points.length > 0 ? (
            <ESTable
              classTable={classes.table}
              tableHeader={
                <TableRow className={classes.rowHeader}>
                  <TableCell style={{ width: '10%' }} align="center">
                    <Typography className={classes.textHeader}>{t('streaming_gift_report_screen.no')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Typography className={classes.textHeader}> {t('point_management_tab.purchase_date')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Typography className={classes.textHeader}> {t('streaming_gift_report_screen.eXeLAB_ID')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '15%' }} align="center">
                    <Typography className={classes.textHeader}> {t('common.eXe_points')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '15%' }} align="center">
                    <Typography className={classes.textHeader}> {t('streaming_gift_report_screen.kinds')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Typography className={classes.textHeader}> {t('streaming_gift_report_screen.tip_target')}</Typography>
                  </TableCell>
                </TableRow>
              }
            >
              {CommonHelper.addSttDataList(detailedReports.points, ITEM_PER_PAGE, page).map((i, key) => (
                <TableRow key={key} className={classes.text}>
                  <TableCell align="center">{i.no}</TableCell>
                  <TableCell align="center">{DateHelper.formatDateTime(i.created_at)}</TableCell>
                  <TableCell align="left">{i.nickname}</TableCell>
                  <TableCell align="right">{FormatHelper.currencyFormat(i.point.toString())}</TableCell>
                  <TableCell align="left">{i.type_report}</TableCell>
                  <TableCell align="left">{i.gift_recipient}</TableCell>
                </TableRow>
              ))}
            </ESTable>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  )
}
export default DetailReport

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity[30],
    borderCollapse: 'inherit',
  },
  headerTable: {
    background: Colors.black_card,
    borderBottom: 0,
    padding: 5,
    '& tr': {
      '& th': {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        color: Colors.white,
      },
    },
  },
  loaderCenter: {
    textAlign: 'center',
  },
  wrapBtn: {
    textAlign: 'right',
  },
  btnCSV: {
    backgroundColor: '#FF4786',
    '&:hover': {
      '& $textBtnCSV': {
        color: '#FF4786',
      },

      backgroundColor: Colors.white,
    },
  },
  textBtnCSV: {
    color: Colors.white,
    textDecoration: 'none',
  },
  paginationStyle: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 32,
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
    '& .MuiPaginationItem-ellipsis': {
      borderRadius: 4,
      borderStyle: 'solid',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
    },
  },

  [theme.breakpoints.down(961)]: {
    paginationStyle: {
      marginRight: '0px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    textHeader: {
      fontSize: 10,
    },

    text: {
      '& td': {
        fontSize: 8,
        padding: '5px!important' as '5px',
      },
    },
    btnCSV: {
      fontSize: 12,
    },
  },
  [theme.breakpoints.down(375)]: {
    paginationStyle: {
      '& .MuiPaginationItem-root': {
        fontSize: '11px',
      },
    },
  },
  [theme.breakpoints.down('xs')]: {
    table: {
      width: '150%',
    },
  },
}))
