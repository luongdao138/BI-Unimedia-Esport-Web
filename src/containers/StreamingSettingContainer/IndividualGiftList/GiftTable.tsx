import { Box, makeStyles, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import GiftTableRow from '@containers/StreamingSettingContainer/IndividualGiftList/GiftTableRow'
import { GiftGroupType } from '@services/gift.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import ESLoader from '@components/Loader'
import ESTable from '@components/Table'

interface Props {
  data: Array<GiftGroupType>
  handleGoToEditGiftGroupState?: (data?: GiftGroupType) => () => void
  refreshData?: () => void
  setCurrentPage?: (currentPage: number) => void
  currentPage: number
  isLoading: boolean
}

const GiftTable: React.FC<Props> = ({ data, handleGoToEditGiftGroupState, refreshData, currentPage, isLoading, setCurrentPage }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation('common')
  const classes = useStyles()

  const header = () => {
    return (
      <TableRow>
        <TableCell style={{ width: '10%' }} align="center">
          {isMobile && <Typography component={'span'}>{t('streaming_gift_report_screen.no')}</Typography>}
        </TableCell>
        <TableCell align="center">
          <Typography component={'span'}>{t('streaming_setting_screen.individual_gift_tab.list_name')}</Typography>
        </TableCell>
        {isMobile ? (
          <TableCell style={{ width: '20%' }} align="left" colSpan={2}></TableCell>
        ) : (
          <>
            <TableCell style={{ width: '10%', minWidth: 68 }} align="left">
              <Typography component={'span'}> {t('streaming_setting_screen.individual_gift_tab.number_of_registration')}</Typography>
            </TableCell>
            <TableCell style={{ width: '20%' }} align="left"></TableCell>
          </>
        )}
      </TableRow>
    )
  }

  const tableContent = () => {
    return CommonHelper.addSttDataList(data, 10, currentPage).map((item, index) => {
      return (
        <GiftTableRow
          item={item}
          index={index}
          key={`GiftTableRow-${index}`}
          handleGoToEditGiftGroupState={handleGoToEditGiftGroupState}
          refreshData={refreshData}
          setCurrentPage={setCurrentPage}
        />
      )
    })
  }
  return (
    <Box className={classes.container}>
      {isLoading ? (
        <Box className={classes.loaderContainer}>
          <ESLoader />
        </Box>
      ) : null}
      <ESTable tableHeader={header()}>{tableContent()}</ESTable>
    </Box>
  )

  // return isLoading ? (
  //   <Box display="flex" justifyContent="center">
  //     <ESLoader />
  //   </Box>
  // ) : (
  //   <>
  //     <ESTable tableHeader={header()}>{tableContent()}</ESTable>
  //   </>
  // )
}

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
}))

export default GiftTable
