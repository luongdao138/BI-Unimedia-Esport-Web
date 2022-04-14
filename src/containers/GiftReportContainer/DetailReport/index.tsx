import { Box, makeStyles, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import ExcelJS from 'exceljs'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useDeliveryReport from '../useDeliveryReport'
import PaginationMobile from './PaginationMobile'
import { DetailedReportParams, DetailedResponse } from '@services/deliveryReport.service'
import { Colors } from '@theme/colors'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { DateHelper } from '@utils/helpers/DateHelper'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import ExportCSV from '@components/ExportCSV'
import ESLoader from '@components/Loader'
import ESTable from '@components/Table'
import Pagination from '@containers/Community/Partials/Pagination'

interface DetailReportProps {
  videoId: string | string[]
}
enum USERS {
  STREAMER = 1,
  VIEWER = 0,
}
const TYPE_REPORT = {
  TICKET: 'チケット',
  TIP: 'チップ',
}

const ITEM_PER_PAGE = 30
// const getItemPerPage = (data: DetailedResponse[], itemPerPage: number, page: number) => {
//   return data.slice(itemPerPage * page - itemPerPage, itemPerPage * page)
// }
const RESPONSE_DATA_DETAIL_REPORT = {
  NO: 'no',
  CREATED_AT: 'created_at',
  USER_CODE: 'user_code',
  POINT: 'point',
  TYPE_REPORT: 'type_report',
  GIFT_RECIPIENT: 'gift_recipient',
}
const headers = [
  { header: 'No.', key: RESPONSE_DATA_DETAIL_REPORT.NO },
  { header: '購入日時', key: RESPONSE_DATA_DETAIL_REPORT.CREATED_AT },
  { header: 'eXeLAB ID', key: RESPONSE_DATA_DETAIL_REPORT.USER_CODE },
  { header: 'eXeポイント', key: RESPONSE_DATA_DETAIL_REPORT.POINT },
  { header: '種別', key: RESPONSE_DATA_DETAIL_REPORT.TYPE_REPORT },
  { header: 'チップ対象', key: RESPONSE_DATA_DETAIL_REPORT.GIFT_RECIPIENT },
] as ExcelJS.Column[]

const handlerRenderTipTarget = (label, typeReport, streamer) => {
  if (typeReport === TYPE_REPORT.TICKET) {
    return (label = 'ー')
  } else if (typeReport === TYPE_REPORT.TIP)
    if (streamer === USERS.VIEWER) {
      return label
    } else if (streamer === USERS.STREAMER) {
      return '配信者'
    }
}
//x.gift_recipient === null ? { ...x, gift_recipient: 'ー' } : x
function DataReportExcel(data: DetailedResponse[], property1: string, property2: string, property3: string) {
  let newData = []
  if (property1 === RESPONSE_DATA_DETAIL_REPORT.USER_CODE && property3 === RESPONSE_DATA_DETAIL_REPORT.POINT) {
    newData = data.map((x) => ({
      ...x,
      user_code: CommonHelper.insertSymbolToFirstString('@', x.user_code),
      point: FormatHelper.currencyFormat(x.point),
    }))
    if (property2 === RESPONSE_DATA_DETAIL_REPORT.GIFT_RECIPIENT) {
      const newDataProperty2 = newData.map((x) =>
        x.typeReport === TYPE_REPORT.TICKET
          ? { ...x, gift_recipient: 'ー' }
          : { ...x, gift_recipient: handlerRenderTipTarget(x.gift_recipient, x.type_report, x.streamer) }
      )
      newData = newDataProperty2
    }
  }

  return newData
}

const DetailReport: React.FC<DetailReportProps> = ({ videoId }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { fetchDetailedReportList, detailedReports, detailedReportMeta } = useDeliveryReport()

  const getTotalPage = () => Math.ceil(detailedReports?.total / ITEM_PER_PAGE)

  const [page, setPage] = useState(1)
  // const { t } = useTranslation('common')
  useEffect(() => {
    const paramDeliveryReport: DetailedReportParams = { uuid: videoId, page: page, limit: ITEM_PER_PAGE }
    fetchDetailedReportList(paramDeliveryReport)
  }, [page])

  const dataReportExcel: DetailedResponse[] =
    detailedReports !== null
      ? DataReportExcel(
          CommonHelper.addSttDataList(detailedReports.points, ITEM_PER_PAGE, page),
          RESPONSE_DATA_DETAIL_REPORT.USER_CODE,
          RESPONSE_DATA_DETAIL_REPORT.GIFT_RECIPIENT,
          RESPONSE_DATA_DETAIL_REPORT.POINT
        )
      : []
  const disableBtnCSV = dataReportExcel.length > 0 ? false : true
  // const renderBtnCSV = () =>
  //   matches ? (
  //     <ESButton variant={'contained'} className={classes.btnCSV} disabled={disableBtnCSV}>
  //       <ExportCSV
  //         headers={headers}
  //         data={dataReportExcel}
  //         className={classes.textBtnCSV}
  //         fileName={'reports.csv'}
  //         textExport={t('streaming_gift_report_screen.csv')}
  //       ></ExportCSV>
  //     </ESButton>
  //   ) : (
  //     <ESButton variant={'contained'} className={classes.btnCSV} disabled={disableBtnCSV}>
  //       <ExportCSV
  //         headers={headers}
  //         data={dataReportExcel}
  //         className={classes.textBtnCSV}
  //         fileName={'reports.csv'}
  //         textExport={t('streaming_gift_report_screen.csv_download')}
  //       ></ExportCSV>
  //     </ESButton>
  //   )
  const renderBtnCSV = () =>
    matches ? (
      <ExportCSV
        headers={headers}
        data={dataReportExcel}
        fileName="reports"
        textExport={t('streaming_gift_report_screen.csv')}
        disableBtnCSV={disableBtnCSV}
      ></ExportCSV>
    ) : (
      <ExportCSV
        headers={headers}
        data={dataReportExcel}
        fileName="reports"
        textExport={t('streaming_gift_report_screen.csv_download')}
        disableBtnCSV={disableBtnCSV}
      ></ExportCSV>
    )
  const renderPagination = () =>
    matches ? (
      // <SpPagination currentPage={page} totalPage={getTotalPage()} onChangePage={setPage} />
      <PaginationMobile page={page} pageNumber={getTotalPage()} setPage={setPage} />
    ) : (
      <Pagination page={page} pageNumber={getTotalPage()} setPage={setPage} />
    )

  return (
    <Box mb={4}>
      <Box display="flex" justifyContent="space-between" alignItems="baseline" mb={2}>
        <Box alignItems="center" margin={`0 auto`}>
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
          {detailedReports?.points?.length > 0 ? (
            <ESTable
              classTable={classes.table}
              classBody={classes.tableCellContent}
              tableHeader={
                <TableRow className={classes.rowHeader}>
                  <TableCell style={{ width: '5%' }} align="center">
                    <Typography className={classes.textHeader}>{t('streaming_gift_report_screen.no')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Typography className={classes.textHeader}> {t('point_management_tab.purchase_date')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Typography className={classes.textHeader}> {t('streaming_gift_report_screen.eXeLAB_ID')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
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
              {CommonHelper.addSttDataList(detailedReports.points, ITEM_PER_PAGE, page).map((i: DetailedResponse, key) => (
                <TableRow key={key} className={classes.text}>
                  <TableCell align="center">{i.no}</TableCell>
                  <TableCell align="center">{DateHelper.formatDateTime(i.created_at)}</TableCell>
                  <TableCell align="left">{CommonHelper.insertSymbolToFirstString('@', i.user_code)}</TableCell>
                  <TableCell align="center">{FormatHelper.currencyFormat(i.point)}</TableCell>
                  <TableCell align="center">{i.type_report}</TableCell>
                  <TableCell align="left">{handlerRenderTipTarget(i.gift_recipient, i.type_report, i.streamer)}</TableCell>
                </TableRow>
              ))}
            </ESTable>
          ) : (
            <ESTable
              classTable={classes.table}
              tableHeader={
                <TableRow className={classes.rowHeader}>
                  <TableCell style={{ width: '5%' }} align="center">
                    <Typography className={classes.textHeader}>{t('streaming_gift_report_screen.no')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Typography className={classes.textHeader}> {t('point_management_tab.purchase_date')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Typography className={classes.textHeader}> {t('streaming_gift_report_screen.eXeLAB_ID')}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
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
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography align="center" className={classes.noTipReceived}>
                    {t('streaming_gift_report_screen.no_tip_received')}
                  </Typography>
                </TableCell>
              </TableRow>
            </ESTable>
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
    maxHeight: '32px',
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
      wordBreak: 'keep-all', //landt: fix 77872
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
    noTipReceived: {
      fontSize: 8,
    },
    //landt: fix 77872
    tableCellContent: {
      '& tr': {
        '& td': {
          wordBreak: 'break-word',
        },
      },
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
      width: '100%',
    },
  },
}))
