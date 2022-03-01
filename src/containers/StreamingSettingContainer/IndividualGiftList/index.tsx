import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import ESButton from '@components/Button'
import { useTranslation } from 'react-i18next'
import GiftTable from '@containers/StreamingSettingContainer/IndividualGiftList/GiftTable'
import GiftListPagination from '@containers/StreamingSettingContainer/IndividualGiftList/Pagination'
import useGiftManage from '@containers/StreamingGiftManagement/useGiftTarget'
import { GiftGroupType } from '@services/gift.service'

type Props = {
  handleGoToCreateNewListState?: () => void
  handleGoToEditGiftGroupState?: (data: GiftGroupType) => () => void
}

const IndividualGiftListContainer: React.FC<Props> = ({ handleGoToCreateNewListState, handleGoToEditGiftGroupState }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { getGiftGroupList, giftGroupList, giftGroupTotal, giftGroupsMeta } = useGiftManage()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getNewOrRefreshData()
  }, [currentPage])

  // const [totalPage, setTotalPage] = useState(10);

  const getNewOrRefreshData = () => {
    getGiftGroupList(currentPage, 10)
  }

  const createNewButton = useCallback(() => {
    return (
      <ESButton className={classes.createButton} onClick={handleGoToCreateNewListState}>
        <Icon className={`fa fa-plus ${classes.iconPlus}`} fontSize="small" />
        <Typography>{t('streaming_setting_screen.individual_gift_tab.create_new')}</Typography>
      </ESButton>
    )
  }, [])

  const displayData = () => giftGroupList

  const displayTable = () => {
    return (
      <Box>
        <GiftTable
          isLoading={giftGroupsMeta.pending}
          currentPage={currentPage}
          data={displayData()}
          handleGoToEditGiftGroupState={handleGoToEditGiftGroupState}
          refreshData={getNewOrRefreshData}
        />
      </Box>
    )
  }

  const totalPage = () => Math.floor(giftGroupTotal / 10.1) + 1

  const onChangePage = (page) => {
    if (page > 0 && page <= 10) setCurrentPage(page)
  }

  const pagination = () => {
    return totalPage() > 1 ? (
      <Box display="flex" alignItems="center" justifyContent="center" className={classes.pagination}>
        <GiftListPagination currentPage={currentPage} totalPage={totalPage()} onChangePage={onChangePage} />
      </Box>
    ) : (
      <Box />
    )
  }
  return (
    <Box className={classes.container}>
      {createNewButton()}

      {giftGroupTotal > 0 ? (
        <>
          {displayTable()}
          {pagination()}
        </>
      ) : (
        <Box textAlign="center" mt={3} mb={3}>
          <Typography component="p">{t('streaming_setting_screen.no_one_has_been_created_yet')}</Typography>
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
  },
  createButton: {
    marginTop: '8px',
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: '1px solid #FFFFFF',
    borderRadius: '20px',
    padding: '8px 12px',
  },
  iconPlus: {
    marginRight: '4px',
  },
  pagination: {
    marginTop: '32px',
    marginBottom: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    createButton: {
      marginRight: '24px',
    },
  },
}))

export default IndividualGiftListContainer
